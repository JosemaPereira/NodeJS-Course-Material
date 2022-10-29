export const RootServices = {
  get: async (req) => {
    const { rawHeaders, url, params, query } = req;
    return {
      message: 'This is a GET request',
      request: { rawHeaders, url, params, query },
    };
  },
  post: async () => {
    return { message: 'This is a POST request' };
  },
  put: async () => {
    return { message: 'This is a PUT request' };
  },
  delete: async () => {
    return { message: 'This is a DELETE request' };
  },
};
