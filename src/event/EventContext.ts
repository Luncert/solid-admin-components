
import { createContext, useContext } from "solid-js";

interface IEventRegistryContext extends CustomEventRegistry {
}

const EventRegistry = createContext<IEventRegistryContext>();

export function useEventRegistry() {
  return useContext<IEventRegistryContext>(EventRegistry as any);
}

export const EventRegistryProvider = EventRegistry.Provider;