let s: string = ''
let n: number = 0
let b: boolean
type Modes = 'on' | 'off'
function test({
  str,
  print = true,
  n,
}: {
  str?: Modes
  print?: boolean
  n?: number
  modes?: Modes[]
}) {
  if (print)
    console.log(str?.toLowerCase())
}
test({ str: 'on', n: 12 })
test({
  str: 'off',
  n: 12,
  modes: ['off', 'on'],
})
//test(s, null, 4)
//test(n)
const arr1 = [1, 2, 3]
const arr2 = [3, 4, 5]
const arr3 = [...arr1, ...arr2]
type Property = {
  a: string
  b: string
}

obj.name = 'ss'
obj.property = { a: '1', b: '2' }
function doSomething(p: {
  p1: string
  p2: boolean
  p3: number
}) {
  if (p.p2) {
    console.log(p.p1)
  } else {
    console.log(p.p2)
  }
}
doSomething({ p3: 122 } as any)
