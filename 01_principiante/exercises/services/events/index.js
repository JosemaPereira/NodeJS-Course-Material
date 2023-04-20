const EventEmitter = require('events');
const { add } = require('../logs');

const eventHandler = new EventEmitter();

eventHandler.on('log', (type, message) => {
  setImmediate(() => {
    add(type, message);
  });
});

module.exports = eventHandler;
