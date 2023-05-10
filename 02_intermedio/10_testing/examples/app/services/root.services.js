import { blog } from '../database/index.js';

const get = async () => {
  try {
    const blogs = await blog.model.find();
    if (!blogs.length) {
      throw new Error('not blog entries found');
    }
    return blogs;
  } catch (e) {
    throw e;
  }
};

const getById = async (req) => {
  try {
    const entry = await blog.model.findById(req.params.id);
    if (!entry)
      throw Error(`not blog entries found with the id ${req.params.id}`);
    return entry;
  } catch (e) {
    throw e;
  }
};

const post = async (req) => {
  try {
    const newModel = new blog.model(req.body);
    const newPost = await newModel.save();
    return newPost;
  } catch (e) {
    throw e;
  }
};

const put = async (req) => {
  try {
    const filter = { _id: req.params.id };
    const result = await blog.model.findOneAndUpdate(filter, req.body, {
      new: true,
    });
    if (!result) throw Error(`not element found with the id ${req.params.id}`);
    return result;
  } catch (e) {
    throw e;
  }
};

const drop = async (req) => {
  try {
    const filter = { _id: req.params.id };
    const result = await blog.model.deleteOne(filter, req.body, { new: true });
    if (!result.deletedCount)
      throw Error(`not element found with the id ${req.params.id}`);
    return result;
  } catch (e) {
    throw e;
  }
};

export const RootServices = {
  get,
  getById,
  post,
  put,
  delete: drop,
};
