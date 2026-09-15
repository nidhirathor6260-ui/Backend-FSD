function print(a,b){
    console.log("Hello World");
    console.log(arguments);
    return a+b;
}
console.log(print(5, 10));;

let printMessage = (message)=>{
    console.log(message);
    // console.log(arguments); // Arguments object is not available in arrow functions
};

fetchData("https://api.example.com/data").then(data=>console.log("Data fetched:", data));

printMessage("Message printed");

async function fetchData(url){
    return console.log("Fetching data from:", url);
}


