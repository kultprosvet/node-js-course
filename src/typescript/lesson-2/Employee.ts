import { Person } from "./Person";
import { Student } from "./Student";

class Employee extends Person{
 constructor(l:string,f:string) {
   super(l,f);
 }
 override sayHi() {
   console.log('EMpl');
 }
}

function promote<T extends Person>(person:T){

}
promote(new Employee('s','s'))
promote(new Student('d','d'))
