import { JSX, createContext, onMount, useContext } from 'solid-js'
import './Filterbar.css'
import { StampedBucket, names } from 'solid-new-bucket'
import { FilterAttributes } from './FilterByCriteria'

interface IFilterbar {
  filters: StampedBucket<FilterAttributes<any>>
}

const FilterbarContext = createContext<IFilterbar>()

function useFilterbar() {
  return useContext(FilterbarContext)
}

export function Filterbar<T>(props: {
  filters: StampedBucket<FilterAttributes<T>>
  onSubmit?(): void
  class?: string
  children: JSX.Element
}) {
  return (
    <form class={names("sac-filterbar", props.class)}
      onSubmit={(evt) => {
        evt.preventDefault()
        props.onSubmit?.()
      }}>
      <FilterbarContext.Provider value={{
        filters: props.filters
      }}>
        {props.children}
      </FilterbarContext.Provider>
    </form>
  )
}

export function Filter<T>(props: {
  name: keyof T
  class?: string
  children: JSX.Element
}) {
  const filterBar = useFilterbar()
  if (!filterBar) {
    throw new Error("FilterbarContext not found")
  }

  let ref: HTMLDivElement

  onMount(() => {
    if (ref?.firstChild) {
      const input = lookupInputElement(ref)
      if (input) {
        const fieldUpdater = bindFilter(filterBar.filters, props.name)
        input.onchange = function (evt) {
          fieldUpdater(evt as any)
        }
        input.onselect = function (evt) {
          fieldUpdater(evt as any)
        }
      }
    }
  })

  return (
    <div ref={el => ref = el} class={names('sac-filter', props.class)}>
      {props.children}
    </div>
  )
}

function lookupInputElement(container: Nullable<Element>): Nullable<HTMLElement> {
  if (!container) {
    return null
  }
  if ('value' in container) {
    return container as any
  }
  
  for (let i = 0; i < container.children.length; i++) {
    const r = lookupInputElement(container.children.item(i))
    if (r) {
      return r
    }
  }

  return null
}

type FilterUpdater<E extends HTMLInputElement | HTMLSelectElement> = (evt: Event & {
  currentTarget: E
  target: E | Element
}) => void;

function bindFilter<T, E extends HTMLInputElement | HTMLSelectElement, K extends keyof T>(
  filters: StampedBucket<FilterAttributes<T>>, field: K): FilterUpdater<E> {
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