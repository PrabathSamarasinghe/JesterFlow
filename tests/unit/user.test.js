const router = require('../../src/user');

describe('User module', () => {
  it('should be a valid express router', () => {
    expect(router).toBeDefined();
    expect(router.stack).toBeDefined();
  });
});
