// import fs from "fs/promises";

// async function test(){
//     console.log("message: 1");
//     const response = await fetch("./students.json");
//     console.log(response.status);
//     const studn = await response.json();
//     return studn;
//     console.log("message:3");

// }

// test().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })

// Event Loop concept
// create async task, function with main name two test callback and Promises inside function, 


console.log("synchrnous task");
const f1 = ()=>{
    console.log("f1");
}

const f2 = ()=>{
    console.log("f2");
}

function main(){
    console.log("this is a event");
    setTimeout(f1,50);
    setTimeout(f2,50);
    new Promise((resolve,reject)=>{
        resolve("I am promise1")
    }).then((result)=>{
        console.log(result);
    })

    new Promise((resolve,reject)=>{
        resolve("I am promise2")
    }).then((result)=>{
        console.log(result);
    })
}