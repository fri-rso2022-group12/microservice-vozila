import { RequestCounterInterceptor } from './request-counter.interceptor';

describe('RequestCounterInterceptor', () => {
  it('should be defined', () => {
    expect(new RequestCounterInterceptor()).toBeDefined();
  });
});
