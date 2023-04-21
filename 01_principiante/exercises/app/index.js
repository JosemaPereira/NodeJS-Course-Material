const { readFile, writeFile } = require('fs/promises');
const { fileServices, vehicleServices, eventHandler: handler } = require('../services');
const { logsCnt, filesCnt } = require('../constants');

const logListener = 'log';

const main = async (res) => {
  try {
    await fileServices.createPath(filesCnt.path.DATA);
    handler.emit(logListener, logsCnt.msg.INFO, 'Inicia el proceso');

    const data = await readFile(filesCnt.filePath.DATA, { encoding: 'utf-8' });
    const map = vehicleServices.mapper(data);
    const parsedData = await Promise.all(map);

    await writeFile(filesCnt.filePath.VEHICLES, JSON.stringify(parsedData, null, 2));

    const filter = parsedData.filter((v) => v.generales.marca === 'FORD');

    handler.emit(logListener, logsCnt.msg.INFO, `Autos registrados: ${parsedData.length} - Vehículos FORD: ${filter.length}`);
    handler.emit(logListener, logsCnt.msg.INFO, 'Termina el proceso');
    res.writeHead(200).write('Success');
    res.end();
  } catch (e) {
    handler.emit(logListener, logsCnt.msg.ERROR, e.toString());
    res.writeHead(500).write(e);
    res.end();
  }
};

module.exports = { main };
