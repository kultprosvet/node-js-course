interface IPerson{
  lastName:string
  firstName:string
}
interface ICustomer extends IPerson{
  checkout(m:number):void
}
interface IUser {
  password:string
}
class PersonImpl implements IPerson,IUser{
  firstName=''
  lastName=''
  password='';
}
function testInterface(p:ICustomer){


}
const obj={
  firstName:'',
  lastName:'',
  checkout(m:number){}
}
testInterface(obj)
