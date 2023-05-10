import moongose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const { connect, connection } = moongose;
let mongoDB = null;

const createInstance = async () => {
  mongoDB = await MongoMemoryServer.create();
};

const connectDB = async () => {
  const uri = mongoDB.getUri();
  const opt = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await connect(uri, opt);
};

const closeDB = async () => {
  await connection.dropDatabase();
  await connection.close();
  await mongoDB.stop();
};

const clearDB = async () => {
  const collections = connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

export const testingDB = {
  create: createInstance,
  connect: connectDB,
  close: closeDB,
  clear: clearDB,
};
