import app from '../../src/app';

describe('\'kanban\' service', () => {
  it('registered the service', () => {
    const service = app.service('kanban');
    expect(service).toBeTruthy();
  });
});
