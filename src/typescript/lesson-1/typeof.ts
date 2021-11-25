const obj = {
  name: 'Objectus',
  property: null as Property | null,
}
type Obj = typeof obj
obj.name = 'ss'
obj.property = { a: '1', b: '2' }
function setConfig(p: Obj): Obj {
  return p
}
async function doSomethingAsync(
  p: Obj
) {
  return p
  /*
  return new Promise((resolve) => {
    setTimeout(() => {
      resol ve(p)
    }, 100)
  })*/
}
doSomethingAsync(p).then()
