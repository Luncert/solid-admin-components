import { Component, JSX, ValidComponent, createContext, useContext } from "solid-js";
import { requireNonNull } from "../utils";
import { Bucket, bucket } from "solid-new-bucket";
import { Dynamic } from "solid-js/web";

interface IEditable {
  editting: Bucket<boolean>
}

const EditableContext = createContext<IEditable>()

export function useEditable() {
  return useContext(EditableContext)
}

export function buildEditable<P>(component: Component<P>): Component<P> {
  const editting = bucket(false)
  return (props: P) => (
    <EditableContext.Provider value={{ editting }}>
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