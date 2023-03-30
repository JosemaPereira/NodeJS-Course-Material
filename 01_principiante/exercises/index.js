const { readFile, writeFile } = require('fs/promises');
const { fileServices, logServices, vehicleServices } = require('./services');
const { logsCnt, filesCnt } = require('./constants');

const index = async () => {
  try {
    await fileServices.createPath(filesCnt.path.DATA);
    await logServices.add(logsCnt.msg.INFO, 'Inicia el proceso');

    const data = await readFile(filesCnt.filePath.DATA, { encoding: 'utf-8' });
    const map = vehicleServices.mapper(data);
    const parsedData = await Promise.all(map);

    await writeFile(filesCnt.filePath.VEHICLES, JSON.stringify(parsedData, null, 2));

    const filter = parsedData.filter((v) => v.generales.marca === 'FORD');

    await logServices.add(logsCnt.msg.INFO, `Autos registrados: ${parsedData.length} - Vehículos FORD: ${filter.length}`);
    await logServices.add(logsCnt.msg.INFO, 'Termina el proceso');
  } catch (e) {
    logServices.add(logsCnt.msg.ERROR, e.toString());
  }
};

index();
