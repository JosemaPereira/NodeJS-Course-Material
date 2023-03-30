const fs = require('fs');
const { promises } = require('fs');

const resourcePath = '../resources/';
const resultsPath = './data/';
const dataFileName = 'consumoGasolina2018.csv';
const logFile = 'service.log';
const vehiclesDB = 'vehicles.json';

const MSG = {
  log: 'LOG',
  warning: 'WARNING',
  error: 'ERROR',
};

const createPath = async (path) => {
  try {
    if (!fs.existsSync(path)) {
      await promises.mkdir(path);
    }
  } catch (e) {
    throw new Error(`error create path: ${e}`);
  }
};

const getDate = () => {
  const today = new Date();
  const hours = today.getHours();
  const mins = today.getMinutes();
  const secs = today.getSeconds();

  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let date = today.getDate();
  date = date < 10 ? `0${date}` : date;

  return `${year}/${month}/${date} ${hours}:${mins}:${secs}`;
};

const logger = async (type, message) => {
  try {
    await promises.appendFile(
      `${resultsPath}${logFile}`,
      `${getDate()} [${type}] ${message}\n`,
    );
  } catch (e) {
    throw new Error(`error at add log: ${e}`);
  }
};

const vehicleParser = async (line) => {
  try {
    const parse = line.split(',');
    return {
      generales: {
        marca: parse[0],
        subMarca: parse[1],
        version: parse[2],
        modelo: parse[3],
      },
      tecnicos: {
        transmision: parse[4],
        combustible: parse[5],
        cilindros: parse[6],
        potencia: parse[7],
      },
      tamano: parse[8],
      categoria: parse[9],
      rendimiento: {
        ciudad: parse[10],
        carretera: parse[11],
        combinado: parse[12],
        ajustado: parse[13],
      },
      contaminantes: {
        co2: parse[14],
        nox: parse[15],
      },
      calificacion: {
        'efecto-invernadero': parse[16],
        'contaminacion-aire': parse[17],
      },
    };
  } catch (e) {
    throw new Error(`error at mapping vehicle: ${e}`);
  }
};

const mapVehicles = (data) => {
  try {
    const vehicles = [];
    const information = data.split('\r\n');
    information.forEach((line, index) => {
      if (index > 0) {
        vehicles.push(vehicleParser(line));
      }
    });
    return vehicles;
  } catch (e) {
    throw new Error(`error at mapping vehicles: ${e}`);
  }
};

const index = async () => {
  try {
    await createPath(resultsPath);
    await logger(MSG.log, 'Inicia el proceso');

    const data = await promises.readFile(`${resourcePath}${dataFileName}`, { encoding: 'utf-8' });
    const vehicles = mapVehicles(data);
    const parsedData = await Promise.all(vehicles);

    await promises.writeFile(`${resultsPath}${vehiclesDB}`, JSON.stringify(parsedData, null, 2));

    const filter = parsedData.filter((v) => v.generales.marca === 'FORD');

    await logger(MSG.log, `Autos registrados: ${parsedData.length} - Vehículos FORD: ${filter.length}`);
    await logger(MSG.log, 'Termina el proceso');
  } catch (e) {
    console.error(`error: ${e}`);
    logger(MSG.error, e);
  }
};

index();
