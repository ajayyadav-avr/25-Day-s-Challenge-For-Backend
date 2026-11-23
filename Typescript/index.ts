/*
string, number, boolean, array, object, tuple, void & never, => any
type
any & unknown
 */

//1. string
const userName: string = "Hello World";

//2. number
const count : number = 123

//3. boolean
const isValid : boolean  = true

//4. array
// array in two ways.
const arr1 : Array<number> = [12,34,56,67]
const arr2 : number[] = [1,2,3,4,5]

//example 1:
//fixed type but not length.
const arr3 : number[] = [1,2]
arr3.push(3)
arr3.push(4)
arr3.push(5)
console.log(arr3);

/*  
Array = fixed type but not length/size.
Tuple = fixed size/length & type.
*/

//5. tuple
const a : [number, number, number] = [1,2,3]
const b : [number, string, number] = [1,"Hello",3]


//6. void & never
//1. void = if the function is not returning something it's void. OR void means a function does work (like console.log)

function greetLog(name:string) :void{
    console.log("Hello "+name);
}
greetLog("jack")

//if a function is returning what type is returning put this on void.
function greetRet(name:string) :string{
    return "Hello "+name
}
greetRet("jack")

//2. never = never is used when a function never returns at all—such as one that always throws an error or loops infinitely.

function abc(name:string) :never{
    throw new Error("Something went Wrong !!")
}
abc("jack")

//7. type
//Instead of writing out { name: string, age: number, isMale: boolean } repeatedly, a type alias gives that shape a reusable name. Anyone reading the function immediately sees what properties data must have.

//example 1:
const userA ={
    name : "Jack",
    age : 24,
    isMale : true
}
function greetUser(data:{name:string,age:number,isMale:boolean}) :void{
    console.log('hello ' + data.name + ' you age is ' + data.age);
}
greetUser(userA)

//example 2:
type USER = {name:string,age:number,isMale:boolean}
const userB:USER ={
    name : "Jack",
    age : 24,
    isMale : true
}
function greetUser1(data:USER) :void{
    console.log('hello ' + data.name + ' you age is ' + data.age);
}
greetUser1(userB)

//8. any & unknown
//any : any turns off TypeScript's safety net, allowing mistakes like calling .toUpperCase() on 123 to slip past compilation and crash at runtime.
//example 1:
const x : any = "hello"
console.log(x.toUpperCase());

//example 2:
const x1 : any = 123
console.log(x1.toUpperCase());

//unknown : unknown is the safe alternative: TypeScript forces you to check typeof y === "string" first before letting you call string methods.
//whenever you have to use unknown you have to give here a cheque

//example 1:
const y : unknown = "hello"
if((typeof y) === "string")
console.log(y.toUpperCase());

//example 2:
const z : unknown = 123
if((typeof z) === "string")
console.log(z.toUpperCase());