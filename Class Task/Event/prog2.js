const EventEmitter = require('event');

class MyEvent extends EventEmitter{

}
const event =  new EventEmitter();
event.on("greet",(name)=>{
    console.log("this is event emmitter");
    console.log(`Hello, ${name}!`);

});

event.on("exit",()=>{});


event.emit("greet", "Satwik");
event.emit("exit");
