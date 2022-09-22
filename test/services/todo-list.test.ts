import app from '../../src/app';

describe('\'todo-list\' service', () => {
  it('registered the service', () => {
    const service = app.service('todo-list');
    expect(service).toBeTruthy();
  });
});
