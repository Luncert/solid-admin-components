import { JSX, createContext, useContext } from "solid-js";
import { requireNonNull } from "../utils";
import { Bucket } from "solid-new-bucket";

interface IEditable {
  editting: Bucket<boolean>
}

const EditableContext =createContext<IEditable>()

export function useEditable() {
  return useContext(EditableContext)
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