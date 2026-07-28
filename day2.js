// function hello(){
//      console.log("Hello World");
//      setTimeout(()=>{
//          console.log("Hello World after 2 seconds");
//      }, 2000);
// }

// hello();
// console.log("End");

function hello(n1,n2,cb){
    console.log("task1");
    console.log(n1+n2);
    cb();
    
}

let a = 10;
let b = 15;
hello(a,b, hi);

function hi(){
    console.log("Learning FSD");
}

//setTimeout doesn't block the execution of code; it's asynchronous.
// Asynchronous code is executed without waiting for the previous code to finish executing.


//Synchronous code run line by line;


