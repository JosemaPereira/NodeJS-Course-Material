export const RootServices = {
  get: (req) => {
    return new Promise((resolve) => {
      const { rawHeaders, url, params, query } = req;
      resolve({
        message: 'This is a GET request',
        request: { rawHeaders, url, params, query },
      })
    })
  },
  post: () => {
    return { message: 'This is a POST request' };
  },
  put: () => {
    return { message: 'This is a PUT request' };
  },
  delete: () => {
    return { message: 'This is a DELETE request' };
  },
};
