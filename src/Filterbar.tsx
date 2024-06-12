import { JSX } from 'solid-js'
import './Filterbar.css'

export default function Filterbar(props: {
  children: JSX.Element
}) {
  return (
    <form>
      {props.children}
    </form>
  )
}