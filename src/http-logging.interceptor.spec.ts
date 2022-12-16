import { HttpLoggingInterceptor } from './http-logging.interceptor';

describe('HttpLoggingInterceptor', () => {
  it('should be defined', () => {
    expect(new HttpLoggingInterceptor()).toBeDefined();
  });
});
