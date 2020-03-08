import { ServiceFactory } from './service.factory';
import { AuthMiddleware } from '../config/middleware/authentication/auth-middleware';

export class MiddlewareFactory {
  static create(): AuthMiddleware {
    return new AuthMiddleware(ServiceFactory.create('user'));
  }
}
