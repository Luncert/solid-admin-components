import { JSX, createContext, useContext } from "solid-js"

export interface IEditableResourceProvider<T, K> {

  getKey(t: T): K
  
  getResource(): T[]

  updateResource(updated: T[]): void

  refetchResource(): Promise<void> | void
}

const EditableResourceProviderContext = createContext<IEditableResourceProvider<any, any>>()

export function useEditableResourceProvider() {
  return useContext(EditableResourceProviderContext)
}

export function WithEditableResource<T, K>(props: {
  editableResourceProvider: IEditableResourceProvider<T, K>
  children: JSX.Element
}) {
  return (
    <EditableResourceProviderContext.Provider value={props.editableResourceProvider}>
      {props.children}
    </EditableResourceProviderContext.Provider>
  )
}