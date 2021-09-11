export interface TypedMap<T = any> {
  [key: string]: T
}

export interface TypedFunction<A = any, R = void> {
  (arg: A): R
}

export interface TypedReturnFunction<R = any> {
  (): R
}

export type Optional<T> = {
  [P in keyof T]?: T[P]
}
