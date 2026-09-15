const EventEmitter = require('events');

const emitter = new EventEmitter();
emitter.on('click', (name) => {
    console.log(`Click event triggered by ${name}`);
});


emitter.on('mouseover', () => {
    console.log('Mouseover event triggered');
});

emitter.emit('click', "Nidhi");
emitter.emit('mouseover');