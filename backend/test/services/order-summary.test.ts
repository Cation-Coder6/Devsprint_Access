import app from '../../src/app';

describe('\'orderSummary\' service', () => {
  it('registered the service', () => {
    const service = app.service('order-summary');
    expect(service).toBeTruthy();
  });
});
