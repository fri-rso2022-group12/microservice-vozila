import { MaintenanceMiddleware } from './maintenance.middleware';

describe('MaintenanceMiddleware', () => {
  it('should be defined', () => {
    expect(new MaintenanceMiddleware()).toBeDefined();
  });
});
