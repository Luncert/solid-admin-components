import { BiSolidDashboard } from "solid-icons/bi"
import { JSX } from "solid-js"
import { Sidebar, SidebarItem } from "../../src/Sidebar"

export default function AppLayout(props: {
  children?: JSX.Element
}) {
  return (
    <div class="relative flex w-full h-full gap-1">
      <Sidebar class="shrink-0 p-2 gap-1 bg-zinc-900">
        <SidebarItem key="home" label={
          <div class="flex items-center gap-2">
            <BiSolidDashboard />
            <span>首页</span>
          </div>
        }>
        </SidebarItem>
      </Sidebar>
      <div class="relative w-full h-full shrink">
        {props.children}
      </div>
    </div>
  )
}