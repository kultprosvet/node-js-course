type Type1={a:string}
type Type2=Type1 & {b:number}
// @ts-ignore
a:Type2=null
const b:Record<string, any>={}
function test(a:Partial<Type2>){

}
type Nullable<T>=T|null|undefined
type SomeType={
  fld:Nullable<string>
}
function newArray<T>(n:number,value:T):T[]{
  return new Array(n).fill(value)
}
newArray(10,1)
