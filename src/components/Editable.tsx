import { Component, JSX, createContext, useContext } from "solid-js";
import { requireNonNull } from "../utils";
import { Bucket, bucket } from "solid-new-bucket";
import { Dynamic } from "solid-js/web";
import { CustomEventRegistryImpl } from "../event/EventRegistry";

const HookEvents = {
  Edit: "Edit",
  Cancel: "Cancel",
  PreSubmit: "PreSubmit",
  Submit: "Submit",
  PostSubmit: "PostSubmit"
}

export interface IEditable {
  editting: Bucket<boolean>
  onEdit(handler: CustomEventHandler): void
  onCancel(handler: CustomEventHandler): void
  onPreSubmit(handler: CustomEventHandler): void
  onSubmit(handler: CustomEventHandler): void
  onPostSubmit(handler: CustomEventHandler): void
}

class EditableImpl extends CustomEventRegistryImpl implements IEditable {
  
  readonly editting = bucket(false)

  onEdit(handler: CustomEventHandler): void {
    this.on(HookEvents.Edit, handler)
  }
  onCancel(handler: CustomEventHandler): void {
    this.on(HookEvents.Cancel, handler)
  }
  onPreSubmit(handler: CustomEventHandler): void {
    this.on(HookEvents.PreSubmit, handler)
  }
  onSubmit(handler: CustomEventHandler): void {
    this.on(HookEvents.Submit, handler)
  }
  onPostSubmit(handler: CustomEventHandler): void {
    this.on(HookEvents.PostSubmit, handler)
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

export function EditAction(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const editable = requireNonNull<IEditable>(useEditable())
  
  return (
    <div {...props} onClick={() => {
      editable.editting(true)
    }}>
      {props.children}
    </div>
  )
}