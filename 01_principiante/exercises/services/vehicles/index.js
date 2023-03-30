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

const mapper = (data) => {
  try {
    const vehicles = [];
    const information = data.split('\r\n');
    information.forEach((line, index) => {
      if (index > 0) {
        vehicles.push(parser(line));
      }
    });
    return vehicles;
  } catch (e) {
    throw new Error(`error at mapping vehicles: ${e}`);
  }
};

module.exports = { mapper };
