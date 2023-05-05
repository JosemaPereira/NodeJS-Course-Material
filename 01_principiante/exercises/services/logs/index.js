const { appendFile } = require('fs/promises');
const { getFormatted } = require('../dates');
const { filesCnt } = require('../../constants');

const add = async (type, message) => {
  try {
    await appendFile(
      filesCnt.filePath.LOGS,
      `${getFormatted()} [${type}] ${message}\n`,
    );
  } catch (e) {
    throw new Error(`error at add log: ${e}`);
  }
};

module.exports = { add };
