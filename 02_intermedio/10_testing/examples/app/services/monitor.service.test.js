import { MonitorServices } from './monitor.service.js';

describe('monitor services', () => {
  it('get a date type', () => {
    const { date } = MonitorServices.getDate();
    expect(date).not.toBeNull();
    expect(date).toBeInstanceOf(Date);
  });
  it('get headers', () => {
    const req = {
      header: jest.fn((x) => x),
    };
    const response = MonitorServices.getHeaders(req);
    expect(response).not.toBeNull();
  });
});
