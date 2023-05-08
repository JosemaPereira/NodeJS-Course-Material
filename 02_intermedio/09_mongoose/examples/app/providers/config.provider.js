import 'dotenv/config';

const dbConnectionSting = `mongodb://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBCOLLECTION}?authSource=admin`;

export const defaultConfig = {
  host: process.env.HOST,
  port: process.env.PORT,
  dbConnectionSting,
};
