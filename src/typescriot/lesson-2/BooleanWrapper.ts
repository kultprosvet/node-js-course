export type BooleanWrapper<T> = {
  [Property in keyof T]: T[Property] extends (p?: any) => any
    ? T[Property]
    : boolean
}
const z: BooleanWrapper<ICustomer>
