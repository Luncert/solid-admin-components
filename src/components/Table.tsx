import { AiFillCaretLeft, AiFillCaretRight } from 'solid-icons/ai'
import './Table.css'
import { JSX } from 'solid-js'

export interface ColumnAttribute {
  label?: string
  value?: string | number
}

export type TableColumns<T> = {[K in keyof T]: ColumnAttribute}

export function Table<T>(props: {
  // columns: TableColumns<T>
  data?: T[]
  renderHeader?(): Element
  renderRow?(): Element
  renderFoot?(): Element
}) {
  return (
    <>
      <div class="sac-table-actions shadow-md p-2">
        <button class="btn btn-sm btn-text">EDIT</button>
        <button class="btn btn-sm btn-text">SELECT</button>
        <div class="join">
          <button class="join-item btn btn-sm"><AiFillCaretLeft /></button>
          <button class="join-item btn btn-sm">1</button>
          <button class="join-item btn btn-sm btn-active">2</button>
          <button class="join-item btn btn-sm btn-disabled">...</button>
          <button class="join-item btn btn-sm">3</button>
          <button class="join-item btn btn-sm">4</button>
          <button class="join-item btn btn-sm"><AiFillCaretRight /></button>
        </div>
      </div>
      <table class="table table-xs">
        {/* <thead>
        </thead>
        <tbody>
        </tbody>
        <tfoot>
        </tfoot> */}
      </table>
    </>
  )
}

// export function buildColumns<T extends {}>(model: T): TableColumns<T> {
//   const r = {} as TableColumns<T>
//   for (let key of Object.keys(model)) {
//     r[key]
//   }
// }