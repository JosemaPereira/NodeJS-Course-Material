const hostHead = 'Host';
const cacheHead = 'cache-control';
const userHead = 'user-agent';
const acceptHead = 'accept';
export const MonitorServices = {
  getDate: () => {
    return { date: new Date() };
  },
  getHeaders: (req) => {
    return {
      [hostHead]: req.header(hostHead),
      [cacheHead]: req.header(cacheHead),
      [userHead]: req.header(userHead),
      [acceptHead]: req.header(acceptHead),
    };
  },
};
