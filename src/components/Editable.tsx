import { Accessor, Component, createContext, useContext } from "solid-js";
import { BiConsumer, Func, bucket, stampedBucket } from "solid-new-bucket";
import { Dynamic } from "solid-js/web";
import { CustomEventRegistryImpl } from "../event/EventRegistry";
import { requireNonNull } from "../utils";
import { IEditableResourceProvider, useEditableResourceProvider } from "./EditableResource";

type Events = "Edit" | "Save" | "Cancel" | "Create" | "Delete" | "DeleteSelected" | "PreSubmit" | "Submit" | "PostSubmit"

export interface IEditable {
  editting: Accessor<boolean>
  selectedAll: Accessor<false>

  edit(): void
  save(): void
  cancel(): void
  create(): void
  delete(key: any): void
  deleteSelected(): void
  flipSelectAll(): void

  onEdit(handler: CustomEventHandler): void
  onCancel(handler: CustomEventHandler): void
  onPreSubmit(handler: CustomEventHandler): void
  onSubmit(handler: CustomEventHandler): void
  onPostSubmit(handler: CustomEventHandler): void
  onError(handler: BiConsumer<Events, Error>): void
}

class EditableImpl<T, K> extends CustomEventRegistryImpl implements IEditable {

  private readonly editableResource = requireNonNull<IEditableResourceProvider<T, K>>(useEditableResourceProvider())
  readonly editting = bucket(false)
  readonly selectedAll = bucket(false)
  readonly selected = stampedBucket<Set<any>>(new Set());
  private readonly editSnapshot = bucket<T[]>([])

  edit(): void {
    this.editting(true)
    this.editSnapshot([...this.editableResource.getResource()]);
  }

  async save() {
    try {
      await this.dispatchSync(new CustomEvent("PreSubmit"))
    } catch (e) {
      this.dispatchError("PreSubmit", e as Error)
    }

    try {
      await this.dispatchSync(new CustomEvent("Submit"))
    } catch (e) {
      this.dispatchError("Submit", e as Error)
      return
    }

    this.editting(false);

    try {
      await this.dispatchSync(new CustomEvent("PostSubmit"))
    } catch (e) {
      this.dispatchError("PostSubmit", e as Error)
      return
    }

    this.editting(true)
  }

  create(): void {
    throw new Error("Method not implemented.");
  }

  delete(item: T): void {
    const key = this.editableResource.getKey(item);
    this.editableResource.updateResource(this.editableResource.getResource()
      .filter(item => this.editableResource.getKey(item) !== key));
  }
  
  /**
   * Delete selected items.
   */
  deleteSelected() {
    this.editableResource.updateResource(this.editableResource.getResource()
      .filter(item => !this.selected().has(this.editableResource.getKey(item))));
    this.selected(data => data.clear());
  }

  async cancel() {
    this.editting(false)
    await this.dispatchSync(new CustomEvent("Cancel"))
  }

  flipSelectAll() {
    this.selectedAll(prev => !prev)
    if (this.selectedAll(prev => !prev)) {
      this.selected((data) => {
        this.editableResource.getResource().forEach((item) => data.add(this.editableResource.getKey(item)));
      });
    } else {
      this.selected((data) => data.clear());
    }
  }

  isSelected(item: T) {
    return this.selected().has(this.editableResource.getKey(item));
  }

  /**
   * Select single item.
   * @param checked: boolean
   * @param item: T 
   */
  select(checked: boolean, item: T) {
    this.selected(data => {
      data[checked ? "add" : "delete"](this.editableResource.getKey(item));
      if (checked) {
        if (data.size === this.editableResource.getResource().length) {
          this.selectedAll(true);
        }
      } else {
        if (data.size === this.editableResource.getResource().length - 1) {
          this.selectedAll(false);
        }
      }
    });
  }

  async onCreate() {
    await this.dispatchSync(new CustomEvent("Create"))
  }

  onEdit(handler: CustomEventHandler): void {
    this.on("Edit", handler)
  }

  onCancel(handler: CustomEventHandler): void {
    this.on("Cancel", handler)
  }

  onPreSubmit(handler: CustomEventHandler): void {
    this.on("PreSubmit", handler)
  }

  onSubmit(handler: CustomEventHandler): void {
    this.on("Submit", handler)
  }

  onPostSubmit(handler: CustomEventHandler): void {
    this.on("PostSubmit", handler)
  }
  
  onError(handler: BiConsumer<Events, Error>): void {
    this.on("Error", (evt) => {
      const { event, error } = evt.detail
      handler(event, error)
    })
  }
  
  private dispatchError(phase: Events, error: Error) {
    this.dispatch(new CustomEvent("Error", { detail: { phase, error }}))
  }
}

const EditableContext = createContext<IEditable>()

export function useEditable() {
  return useContext(EditableContext)
}

export function buildEditable<P>(component: Component<P>): Component<P> {
  const data = new EditableImpl()
  return (props: P) => (
    <EditableContext.Provider value={data}>
      <Dynamic component={component} {...props} />
    </EditableContext.Provider>
  )
}


interface DataChanges<T> {
  toDelete: T[]
  toCreate: T[]
}

function determineChanges<T, K>(snapshotBeforeEdit: T[], current: T[], keyGetter: Func<T, K>): DataChanges<T> {
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