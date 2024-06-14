
export {}

declare global {

  type Nullable<T> = T | null

  type VoidFunc = () => void

  type CustomEventHandler = (evt: CustomEvent) => void | Promise<void>;
  
  interface CustomEventRegistry {
    dispatch(evt: CustomEvent): void;
    dispatchSync(evt: CustomEvent): Promise<void>;
    on(event: string, handler: CustomEventHandler, addCleanup?: boolean): void;
    off(event: string, handlerId: string): void;
  }
}