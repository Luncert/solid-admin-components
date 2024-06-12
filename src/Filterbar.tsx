import { JSX, createContext, useContext } from 'solid-js'
import './Filterbar.css'
import { StampedBucket, names } from 'solid-new-bucket'
import { FilterAttributes } from './FilterByCriteria'

interface IFilterbar {

}

const FilterbarContext = createContext<IFilterbar>()

function useFilterbar() {
  return useContext(FilterbarContext)
}

export default function Filterbar(props: {
  class?: string
  children: JSX.Element
}) {
  return (
    <form class={names("sac-filterbar", props.class)}>
      {props.children}
    </form>
  )
}

export function updateFilters<E>(evt: Event & {
  currentTarget: E
  target: E
}): void;
export function updateFilters<E>(evt: UIEvent & {
  currentTarget: E
  target: Element
}): void;
export function updateFilters(evt: any) {
  const filterBar = useFilterbar()
  if (!filterBar) {
    throw new Error("FilterbarContext not found")
  }
}

type FilterUpdater<E> = (evt: Event & {
  currentTarget: E
  target: E | Element
}) => void;

export function createFilterUpdater<T, E extends HTMLElement, K extends keyof T>(filters: StampedBucket<FilterAttributes<T>>, field: K): FilterUpdater<E> {
  return (e) => {
    const newValue = e.currentTarget.value
    filters(data => {
      const matchOptions = data[field].match
      if (matchOptions) {
        matchOptions.value = newValue
      }
    })
  }
}