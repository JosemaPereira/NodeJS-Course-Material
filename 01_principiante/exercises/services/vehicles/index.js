const { readFile } = require('fs/promises');
const _ = require('underscore');
const eventHandler = require('../events');
const { logsCnt, apiCnt } = require('../../constants');
const client = require('../http');

const parser = async (line) => {
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

const getVehiclesFromFile = async (file) => {
  try {
    eventHandler.emit(logsCnt.listener, logsCnt.msg.INFO, 'Lee datos del archivo csv');
    const data = await readFile(file, { encoding: 'utf-8' });
    const vehicles = [];
    const lines = data.split('\r\n');
    lines.forEach((line, index) => {
      if (index > 0) {
        vehicles.push(parser(line));
      }
    });
    eventHandler.emit(logsCnt.listener, logsCnt.msg.INFO, 'Parsea información');
    const parsedData = await Promise.all(vehicles);
    return parsedData;
  } catch (e) {
    return e;
  }
};

const getVehiclesFromAPI = async () => {
  try {
    const carsInfo = await client.getRequest(apiCnt.carAPIUrl);
    return carsInfo.cars;
  } catch (e) {
    return e;
  }
};

const filterVehicles = async (fromFile, fromAPI) => {
  const filtered = [];
  eventHandler.emit(logsCnt.listener, logsCnt.msg.INFO, 'Filtra resultados de los vehículos');
  const unique = _.uniq(fromAPI, (v) => v.car && v.car_model);

  unique.forEach((v) => {
    const subSet = fromFile.filter(
      ({ generales }) => generales.marca === v.car && generales.subMarca === v.car_model,
    );
    filtered.push(...subSet);
  });

  return filtered;
};

module.exports = { getVehiclesFromFile, getVehiclesFromAPI, filterVehicles };
