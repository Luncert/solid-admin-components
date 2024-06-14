import { ValidComponent } from "solid-js"
import { Dynamic } from "solid-js/web"
import { Bucket, Func, bucket } from "solid-new-bucket"
import { IEditable, useEditable } from "./Editable"
import { requireNonNull } from "../utils"

interface ListDataChanges<T> {
  toDelete: T[]
  toCreate: T[]
}

export default abstract class ListChangeRecorder<T, K> {

  protected readonly editable: IEditable

  private readonly editSnapshot = bucket<T[]>([])
  private readonly confirmedChanges?: Bucket<ListDataChanges<T> | null>

  constructor(protected readonly keyGetter: Func<T, K>) {
    this.editable = requireNonNull<IEditable>(useEditable())
    this.confirmedChanges = bucket<ListDataChanges<T> | null>(null)

    this.editable.onEdit(this.onEdit.bind(this))
    this.editable.onPreSubmit(async () => {
      await this.confirmChangesInternal()
    })
    this.editable.onSubmit(async () => {
      const changes = this.confirmChangesInternal()
      if (changes) {
        await this.commitChanges()
      }
    })
    this.editable.onPostSubmit(async () => {
      const r = this.refetchResource()
      if (r) {
        await r
      }
    })
    this.editable.onCancel(async () => {
      const r = this.refetchResource()
      if (r) {
        await r
      }
    })
  }

  onCreate(item: T) {
    this.updateResource([...this.getResource(), item])
  }

  /**
   * Delete single item.
   * @param name
   */
  onDelete(item: T) {
    const key = this.keyGetter(item);
    this.updateResource(this.getResource().filter(item => this.keyGetter(item) !== key));
  }

  onEdit() {
    this.editSnapshot([...this.getResource()]);
  }

  onCancel() {
    this.resetAll();
  }

  private confirmChangesInternal() {
    const changes = determineChanges(this.editSnapshot(), this.getResource(), this.keyGetter)
    if (changes.toDelete.length === 0 && changes.toCreate.length === 0) {
      // refetch will be called in PostSubmit handler
      // this.resetAll()
      return;
    }

    return new Promise<void>((resolve, reject) => {
      const onCommit = () => {
        this.confirmedChanges?.(changes)
        resolve()
      }
  
      const onDiscard = () => {
        this.confirmedChanges?.(null)
        resolve()
      }

      this.confirmChanges(changes, onCommit, onDiscard)
    })
  }

  private async commitChanges() {
    const changes = this.confirmedChanges?.()
    if (!changes) {
      return
    }

    if (changes.toDelete.length > 0) {
      await this.deleteItems(changes.toDelete.map(this.keyGetter))
    }

    if (changes.toCreate.length > 0) {
      await this.createItems(changes.toCreate)
    }
  }

  protected resetAll() {
    this.refetchResource()
  }

  protected abstract getResource(): T[]

  protected abstract updateResource(updated: T[]): void

  protected abstract refetchResource(): Promise<void> | void

  protected async createItems(items: T[]) {
  }

  protected async deleteItems(itemKeys: K[]) {
  }

  protected async confirmChanges(changes: ListDataChanges<T>, onCommit: VoidFunc, onDiscard: VoidFunc) {

  }
}

function determineChanges<T, K>(snapshotBeforeEdit: T[], current: T[], keyGetter: Func<T, K>): ListDataChanges<T> {
  const toDelete: T[] = [];
  const toCreate: T[] = [];
  const snapshot = snapshotBeforeEdit.reduce((map, elem) => {
    map.set(keyGetter(elem), elem);
    return map;
  }, new Map<K, T>());
  const cache = current.reduce((map, elem) => {
    map.set(keyGetter(elem), elem);
    return map;
  }, new Map<K, T>());

  snapshot.forEach((elem, key) => {
    if (!cache.has(key)) {
      toDelete.push(elem);
    }
  });
  cache.forEach((elem, key) => {
    if (!snapshot.has(key)) {
      toCreate.push(elem);
    }
  });
  return ({
    toDelete,
    toCreate
  });
}