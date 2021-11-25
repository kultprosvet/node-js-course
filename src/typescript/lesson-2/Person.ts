export abstract class Person{
  public lastName:string=''
  firstName:string=''
  #hash='ss'
  constructor(l:string,f:string) {
    this.firstName=f
    this.lastName=l
  }
  sayHi(){
    console.log(this.firstName+" "+this.lastName);
  }
}





