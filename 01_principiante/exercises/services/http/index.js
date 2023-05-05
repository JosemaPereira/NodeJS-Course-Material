const axios = require('axios');
const { logsCnt } = require('../../constants');
const eventHandler = require('../events');

const { logListener, msg: { INFO, ERROR } } = logsCnt;

const getRequest = async (url) => {
  try {
    eventHandler.emit(logListener, INFO, 'GET request');
    const response = await axios.get(url);
    eventHandler.emit(logListener, INFO, 'GET request end');
    return response.data;
  } catch (e) {
    eventHandler.emit(logListener, ERROR, 'GET request failed');
    return e;
  }
};

module.exports = { getRequest };
