import app from '../../src/app';

describe('\'cart \' service', () => {
  it('registered the service', () => {
    const service = app.service('cart');
    expect(service).toBeTruthy();
  });
});
