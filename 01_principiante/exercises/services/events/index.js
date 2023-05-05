const EventEmitter = require('events');
const { add } = require('../logs');
const { logsCnt } = require('../../constants');

const eventHandler = new EventEmitter();

eventHandler.on(logsCnt.listener, (type, message) => {
  setImmediate(() => {
    add(type, message);
  });
});

module.exports = eventHandler;
