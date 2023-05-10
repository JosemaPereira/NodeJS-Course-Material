import { MonitorController } from './monitor.controller.js';

describe('monitor controller', () => {
  it('page is rendered', () => {
    const req = {
      header: jest.fn((x) => x),
    };
    const res = { render: jest.fn() };
    const callback = () => {
      return null;
    };
    MonitorController.getStats(req, res, callback);
    expect(res.render.mock.calls[0][0]).toBe('pages/monitor/index');
  });
});
