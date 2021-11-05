type Indexed = {
  a: string
  b: string
  [k: string]: string
}
const x2: Indexed = { a: '1', b: '2' }
x2['a']
