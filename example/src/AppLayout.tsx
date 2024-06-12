import { BiSolidDashboard } from "solid-icons/bi"
import { JSX } from "solid-js"
import { Sidebar, SidebarItem } from "../../src/Sidebar"
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import { RiSystemAddCircleFill } from "solid-icons/ri"
import { A } from "@solidjs/router"
import { BsList } from "solid-icons/bs"

export default function AppLayout(props: {
  children?: JSX.Element
}) {
  return (
    <div class="relative flex w-full h-full gap-1">
      <Sidebar class="shrink-0 p-2 gap-1 bg-zinc-900">
        <div class="flex flex-col p-2 gap-2">
          <div class="flex justify-center gap-2">
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} class="h-8 transition-all logo" alt="Vite logo" />
            </a>
            <a href="https://solidjs.com" target="_blank">
              <img src={solidLogo} class="h-8 transition-all logo solid" alt="Solid logo" />
            </a>
          </div>
          <div class="text-center">
            <h1>Vite + Solid</h1>
          </div>
        </div>
        <A class="nav" href="/home">
          <SidebarItem key="home" label={
            <div class="flex items-center gap-2">
              <BiSolidDashboard />
              <span>Home</span>
            </div>
          } />
        </A>
        <SidebarItem key="list-views" label={
          <div class="flex items-center gap-2">
            <BsList />
            <span>List Views</span>
          </div>
        }>
          <A class="nav" href="/list-views/basic">
            <SidebarItem key="basic" label="Basic List" />
          </A>
        </SidebarItem>
        <SidebarItem key="settings" label={
          <div class="flex items-center gap-2">
            <RiSystemAddCircleFill />
            <span>Settings</span>
          </div>
        }>
          <A class="nav" href="/settings/ui">
            <SidebarItem key="ui-settings" label="UI Settings" />
          </A>
        </SidebarItem>
      </Sidebar>
      <div class="flex flex-col w-full h-full shrink bg-zinc-100">
        <Header />
        <div class="divider divider-zinc-500 m-0" />
        <div class="shrink w-full h-full p-2">
          {props.children}
        </div>
      </div>
    </div>
  )
}

function Header() {
  return (
    <div class="p-2 shrink-0">
      <div class="max-w-md text-sm breadcrumbs text-zinc-500">
        <ul>
          <li>Long text 1</li>
          <li>Long text 2</li>
          <li>Long text 3</li>
          <li>Long text 4</li>
          <li>Long text 5</li>
        </ul>
      </div>
    </div>
  )
}