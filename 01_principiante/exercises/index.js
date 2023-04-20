const { readFile, writeFile } = require('fs/promises');
const {
  fileServices, vehicleServices, eventHandler,
} = require('./services');
const { logsCnt, filesCnt } = require('./constants');

const logListener = 'log';

const index = async () => {
  try {
    await fileServices.createPath(filesCnt.path.DATA);
    eventHandler.emit(logListener, logsCnt.msg.INFO, 'Inicia el proceso');

    const data = await readFile(filesCnt.filePath.DATA, { encoding: 'utf-8' });
    const map = vehicleServices.mapper(data);
    const parsedData = await Promise.all(map);

    await writeFile(filesCnt.filePath.VEHICLES, JSON.stringify(parsedData, null, 2));

    const filter = parsedData.filter((v) => v.generales.marca === 'FORD');

    eventHandler.emit(logListener, logsCnt.msg.INFO, `Autos registrados: ${parsedData.length} - Vehículos FORD: ${filter.length}`);
    eventHandler.emit(logListener, logsCnt.msg.INFO, 'Termina el proceso');
  } catch (e) {
    eventHandler.emit(logListener, logsCnt.msg.ERROR, e.toString());
  }
};

index();
