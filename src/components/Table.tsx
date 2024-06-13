import './Table.css'
import { For, JSX, Show } from 'solid-js'
import { FilterAttributes } from './FilterByCriteria'
import { buildEditable, useEditable } from './Editable'

function _Table<T extends {[k: string]: string | number}>(props: {
  filters: FilterAttributes<T>
  data?: T[]
  actions?: JSX.Element

  showItemId?: boolean
}) {
  const editable = useEditable()

  return (
    <>
      {props.actions}
      <div class='shrink w-full h-full overflow-x-auto'>
        <table class="table table-pin-rows">
          <thead>
            <tr>
              <Show when={editable?.editting()}>
                <th></th>
              </Show>
              <Show when={props.showItemId}>
                <th></th>
              </Show>
              <For each={Object.keys(props.filters)}>{item => (
                <th>{item}</th> 
              )}</For>
            </tr>
          </thead>
          <tbody>
            <For each={props.data}>{item => (
              <tr>
                <Show when={editable?.editting()}>
                  <td class='align-middle'>
                    <input type="checkbox" class="checkbox checkbox-sm checkbox-sky-600" checked />
                  </td>
                </Show>
                <For each={Object.keys(props.filters)}>{name => (
                  <td>{item[name as keyof T]}</td>
                )}</For>
              </tr>
            )}</For>
          </tbody>
          <tfoot>
          </tfoot>
        </table>
      </div>
    </>
  )
}

export const Table = buildEditable(_Table)

export function TableActions(props: {

} & JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div class="sac-table-actions shrink-0 shadow-md p-2">
      {props.children}
    </div>
  )
}

// export function buildColumns<T extends {}>(model: T): TableColumns<T> {
//   const r = {} as TableColumns<T>
//   for (let key of Object.keys(model)) {
//     r[key]
//   }
// }