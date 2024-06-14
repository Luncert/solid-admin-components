import { JSX, splitProps } from "solid-js"
import { requireNonNull } from "../utils"
import { IEditable, useEditable } from "./Editable"

type ActionProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "onClick">

export function EditAction(props: ActionProps) {
  const editable = requireNonNull<IEditable>(useEditable())
  
  return (
    <Action onClick={() => editable.edit()} {...props} />
  )
}

export function SaveAction(props: ActionProps) {
  const editable = requireNonNull<IEditable>(useEditable())
  
  return (
    <Action onClick={() => editable.save()} {...props} />
  )
}

export function CancelAction(props: ActionProps) {
  const editable = requireNonNull<IEditable>(useEditable())
  
  return (
    <Action onClick={() => editable.cancel()} {...props} />
  )
}

export function DeleteAction(props: {
  key: any
} & ActionProps) {
  const editable = requireNonNull<IEditable>(useEditable())
  const [local, others] = splitProps(props, ["key"])
  
  return (
    <Action onClick={() => editable.delete(local.key)} {...others} />
  )
}

export function DeleteSelectedAction(props: ActionProps) {
  const editable = requireNonNull<IEditable>(useEditable())
  
  return (
    <Action onClick={() => editable.deleteSelected()} {...props} />
  )
}

export function SelectAllAction(props: ActionProps) {
  const editable = requireNonNull<IEditable>(useEditable())
  
  return (
    <Action onClick={() => editable.flipSelectAll()} {...props} />
  )
}

export function UnSelectAllAction(props: ActionProps) {
  const editable = requireNonNull<IEditable>(useEditable())
  
  return (
    <Action onClick={() => editable.flipSelectAll()} {...props} />
  )
}

function Action(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} onClick={() => {
    }}>
      {props.children}
    </div>
  )
}