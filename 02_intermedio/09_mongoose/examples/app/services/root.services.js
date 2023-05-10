import { blog } from '../database/index.js';

export const RootServices = {
  get: () => {
    return new Promise((resolve, reject) => {
      blog.model
        .find()
        .then((res) => {
          if (!res.length) reject(new Error('not blog entries found'));
          resolve(res);
        })
        .catch((e) => {
          reject(new Error('error at get blog entries'));
        });
    });
  },
  getById: (req) => {
    return new Promise((resolve, reject) => {
      blog.model
        .findById(req.params.id)
        .exec()
        .then((res) => {
          if (!res)
            reject(
              new Error(`not blog entries found with the id ${req.params.id}`),
            );
          resolve(res);
        })
        .catch((e) => {
          reject(new Error(`error at get blog entries ${e}`));
        });
    });
  },
  post: (req) => {
    return new Promise((resolve, reject) => {
      const newPost = blog.model(req.body);
      newPost
        .save()
        .then((res) => {
          resolve({ message: res });
        })
        .catch((e) => {
          reject(new Error('fail at create new blog entry: ' + e));
        });
    });
  },
  put: (req) => {
    return new Promise((resolve, reject) => {
      const filter = { _id: req.params.id };
      blog.model
        .findOneAndUpdate(filter, req.body, { new: true })
        .then((res) => {
          if (!res)
            reject(new Error(`not element found with the id ${req.params.id}`));
          resolve({ message: res });
        })
        .catch((e) => {
          reject(new Error('error at update entry ' + e));
        });
    });
  },
  delete: (req) => {
    return new Promise((resolve, reject) => {
      const filter = { _id: req.params.id };
      blog.model
        .deleteOne(filter, req.body, { new: true })
        .then((res) => {
          if (!res.deletedCount)
            reject(new Error(`not element found with the id ${req.params.id}`));
          resolve({ message: res });
        })
        .catch((e) => {
          reject(new Error('error at delete entry ' + e));
        });
    });
  },
};
