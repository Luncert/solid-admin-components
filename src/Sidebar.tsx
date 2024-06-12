import { RiArrowsArrowDropUpLine } from "solid-icons/ri"
import { JSX, Show, createContext, createEffect, createMemo, splitProps, useContext } from "solid-js"
import { Bucket, bucket, conditional, names } from 'solid-new-bucket'
import './Sidebar.css'

interface ISidebar {
  selected: Bucket<Nullable<string>>
}

const SidebarContext = createContext<ISidebar>()

function useSidebar() {
  return useContext<ISidebar>(SidebarContext as any)
}

export function Sidebar(props: {} & JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, others] = splitProps(props, ["class", "children"])
  const selected = bucket<Nullable<string>>(null)

  return (
    <div class={names("sac-sidebar", local.class)} {...others}>
      <SidebarContext.Provider value={{
        selected
      }}>
        {local.children}
      </SidebarContext.Provider>
    </div>
  )
}

interface ISidebarEntry {
  parent: string
  updateParent(): void
}

const SidebarEntryContext = createContext<ISidebarEntry>()

function useSidebarEntry() {
  return useContext(SidebarEntryContext)
}

export function SidebarItem(props: {
  /**
   * Item key is used to identify an unique item entry.
   */
  key: string

  /**
   * Content to display.
   */
  label: JSX.Element

  /**
   * Left padding works as icon placeholder.
   */
  childrenPaddingLeft?: string

  /**
   * Sub-items.
   */
  children?: JSX.Element
}) {
  const sidebar = useSidebar()
  const entry = useSidebarEntry()

  let childrenContainer: HTMLDivElement

  const key = entry ? `${entry.parent}/${props.key}` : props.key
  const expanded = createMemo(() => props.children && sidebar.selected()?.startsWith(key))

  const updateHeight = () => {
    const base = window.getComputedStyle(childrenContainer.firstChild as any).height
    if (expanded()) {
      childrenContainer.style.height = base
      setTimeout(() => childrenContainer.style.height = 'max-content', 150)
    } else {
      if ((childrenContainer as HTMLDivElement).style.height === 'max-content') {
        childrenContainer.style.height = base
        setTimeout(() => childrenContainer.style.height = "0px", 1)
      } else {
        childrenContainer.style.height = "0px"
      }
    }
  }

  createEffect(() => {
    if (childrenContainer) {
      updateHeight()
    }
  })

  return (
    <div class={names("sac-sidebar-item", conditional(expanded(), "gap-2"))}>
      <div class={
        names(
          "sac-sidebar-item-label",
          conditional(sidebar.selected() === key, "selected"),
          conditional(entry, "pl-8")
        )
      }
      onClick={() => sidebar.selected(key)}>
        {props.label}
        <div class={names("sac-sidebar-item-expand-indicator", expanded() ? "rotate-180" : "rotate-0")}>
          <Show when={props.children}>
            <RiArrowsArrowDropUpLine />
          </Show>
        </div>
      </div>
      <div class="sac-sidebar-item-expand"
        ref={el => childrenContainer = el}>
        <div class="sac-sidebar-item-expand-content" style={{
          "padding-left": props.childrenPaddingLeft
        }}>
          <SidebarEntryContext.Provider value={{
            parent: key,
            updateParent: updateHeight
          }}>
            {props.children}
          </SidebarEntryContext.Provider>
        </div>
      </div>
    </div>
  )
}