import { BiSolidDashboard } from "solid-icons/bi"
import { JSX } from "solid-js"
import { Sidebar, SidebarItem } from "../../src/Sidebar"
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'

export default function AppLayout(props: {
  children?: JSX.Element
}) {
  return (
    <div class="relative flex w-full h-full gap-1">
      <Sidebar class="shrink-0 p-2 gap-1 bg-zinc-900">
        <div class="p-2">
          <div class="flex justify-center gap-2">
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} class="h-8 transition-all logo" alt="Vite logo" />
            </a>
            <a href="https://solidjs.com" target="_blank">
              <img src={solidLogo} class="h-8 transition-all logo solid" alt="Solid logo" />
            </a>
          </div>
          <h1>Vite + Solid</h1>
        </div>
        <SidebarItem key="home" label={
          <div class="flex items-center gap-2">
            <BiSolidDashboard />
            <span>Home</span>
          </div>
        }>
          <SidebarItem key="subMenu" label="Sub Menu" />
        </SidebarItem>
      </Sidebar>
      <div class="relative w-full h-full shrink">
        {props.children}
      </div>
    </div>
  )
}