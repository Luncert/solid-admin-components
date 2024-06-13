import { AiFillSetting } from 'solid-icons/ai'
import { For, JSX, Match, Show, Switch, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { StampedBucket, bucket, conditional, names } from 'solid-new-bucket'
import { FilterAttribute, FilterAttributes, FilterColumnAttribute, FilterSortAttribute } from './FilterByCriteria'
import { TbSortAscending, TbSortDescending } from 'solid-icons/tb'
import { requireNonNull } from '../utils'

const modalTabs = {
  sort: SortSettings,
  "column-control": ColumnControlSettings
}

export default function FilterbarSettings<T>(props: {
  filters: StampedBucket<FilterAttributes<T>>
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, "children">) {
  const [local, others] = splitProps(props, ["filters"])

  const selectedTab = bucket("sort")

  const openModal = () => {
    const elem = document.getElementById('filterbar-settings-modal')
    if (elem) (elem as any).showModal()
  }

  return (
    <div {...others}>
      <button class="btn btn-square btn-sm" type='button' onClick={openModal}>
        <AiFillSetting />
      </button>

      <dialog id="filterbar-settings-modal" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button class="btn btn-sm btn-square btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 class="font-bold text-lg">page-settings</h3>
          <div role="tablist" class="tabs tabs-bordered">
            <For each={Object.keys(modalTabs)}>{item => (
              <a role="tab" class={names("tab", conditional(selectedTab() === item, "tab-active"))}
                onClick={() => selectedTab(item)}>{item}</a>
            )}</For>
          </div>
          <Switch>
            <For each={Object.entries(modalTabs)}>{([name, element]) => (
              <Match when={selectedTab() === name}>
                <Dynamic component={element} filters={local.filters} />
              </Match>
            )}</For>
          </Switch>
        </div>
      </dialog>
    </div>
  )
}

function SortSettings(props: {
  filters: StampedBucket<FilterAttributes<any>>
}) {
  return (
    <div class="overflow-x-auto">
      <table class="table table-pin-rows">
        <thead>
          <tr>
            <th></th>
            <th>name</th>
            <th class='text-center'>order</th>
            <th class='text-center'>enable</th>
          </tr>
        </thead>
        <tbody>
          <For each={Object.entries(props.filters()).filter(([k, config]) => "sort" in config)}>{([name, config], idx) => (
            <tr class='hover'>
              <th>{idx() + 1}</th>
              <td>{name}</td>
              <td class='text-center'>
                <button class="btn btn-square btn-ghost btn-sm"
                  onClick={() => props.filters(data => {
                    const sort = requireNonNull<FilterSortAttribute>(data[name].sort)
                    sort.order = sort.order === "asc" ? "desc" : "asc"
                  })}>
                  <Show when={(config as FilterAttribute).sort?.order === "asc"}
                    fallback={<TbSortDescending />}>
                    <TbSortAscending />
                  </Show>
                </button>
              </td>
              <td class='text-center'>
                <input type="checkbox" class="toggle toggle-sm"
                  checked={config.sort?.active}
                  onClick={() => props.filters(data => {
                    const sort = requireNonNull<FilterSortAttribute>(data[name].sort)
                    sort.active = !sort.active
                  })} />
              </td>
            </tr>
          )}</For>
        </tbody>
      </table>
    </div>
  )
}

function ColumnControlSettings(props: {
  filters: StampedBucket<FilterAttributes<any>>
}) {
  return (
    <div class="overflow-x-auto">
      <table class="table table-pin-rows">
        <thead>
          <tr>
            <th></th>
            <th>name</th>
            <th class='text-center'>visible</th>
          </tr>
        </thead>
        <tbody>
          <For each={Object.entries(props.filters()).filter(([k, config]) => "sort" in config)}>{([name, config], idx) => (
            <tr class='hover'>
              <th>{idx() + 1}</th>
              <td>{name}</td>
              <td class='text-center'>
                <input type="checkbox" class="toggle toggle-sm"
                  checked={config.columnControl?.visible}
                  onClick={() => props.filters(data => {
                    const columnControl = requireNonNull<FilterColumnAttribute>(data[name].columnControl)
                    columnControl.visible = !columnControl.visible
                  })} />
              </td>
            </tr>
          )}</For>
        </tbody>
      </table>
    </div>
  )
}