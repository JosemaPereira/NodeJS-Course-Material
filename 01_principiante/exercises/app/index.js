const { writeFile } = require('fs/promises');
const { fileServices, vehicleServices, eventHandler: handler } = require('../services');
const { logsCnt, filesCnt } = require('../constants');

const main = async (res) => {
  try {
    await fileServices.createPath(filesCnt.path.DATA);
    handler.emit(logsCnt.listener, logsCnt.msg.INFO, 'Inicia el proceso');

    const fromFile = await vehicleServices.getVehiclesFromFile(filesCnt.filePath.DATA);
    const fromAPI = await vehicleServices.getVehiclesFromAPI();
    const data = await vehicleServices.filterVehicles(fromFile, fromAPI);
    await writeFile(filesCnt.filePath.VEHICLES, JSON.stringify(data, null, 2));

    handler.emit(logsCnt.listener, logsCnt.msg.INFO, 'Termina el proceso');
    res.writeHead(200).write(JSON.stringify(data));
    res.end();
  } catch (e) {
    handler.emit(logsCnt.listener, logsCnt.msg.ERROR, e);
    res.writeHead(500).write({ error: e.toString() });
    res.end();
  }
};

module.exports = { main };
