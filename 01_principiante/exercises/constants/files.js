const path = {
  RESOURCES: '../resources/',
  DATA: './data/',
};

const filePath = {
  DATA: `${path.RESOURCES}consumoGasolina2018.csv`,
  LOGS: `${path.DATA}service.log`,
  VEHICLES: `${path.DATA}vehicles.json`,
};

module.exports = {
  path, filePath,
};
