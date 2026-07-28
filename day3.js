

const promise1 = new Promise((resolve,reject)=>{
    console.log("Promise task 1");
    //resolve("Promises passed by using resolve");

    let msg = true;
    if(msg){
         resolve("Promises passed by using resolve");
    }else{
        console.log("Error....");
        reject("Promise rejected");

    }
     

     setTimeout(()=>{
        console.log("Message after 2 second.");
     },2000);
});

promise1.then((result)=>{
    console.log(result);
}).catch((error)=>{
    console.log(error);
})

// await is used to pause the function until synchronous operation
// is wrapped in a resolved promise;


// console.log("1");
// function hello(){
//     console.log("Hello function");
// }
// async function fun(){
//     console.log("async function");
//     await console.log("2");
//     console.log("3");
//     console.log("4");
// }

// t1 = fun();
// console.log(t1);
// hello();
// console.log("5");
// console.log("6");
// console.log(t1);

const promise = new Promise((resolve, reject)=>{
    resolve("")
})

promise.then((result)=>{

}).catch((error)=>{

})