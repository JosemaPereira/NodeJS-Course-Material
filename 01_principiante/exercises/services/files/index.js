const fs = require('fs');
const { mkdir } = require('fs/promises');

const createPath = async (path) => {
  try {
    if (!fs.existsSync(path)) {
      await mkdir(path);
    }
  } catch (e) {
    throw new Error(`error create path: ${e}`);
  }
};

module.exports = { createPath };
