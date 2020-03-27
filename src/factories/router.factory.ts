import { RouterServiceFactory } from '@danielc7150/express-utils';
import { Router } from 'express';

import { TodoRoutes } from '../collections/todos/routes/todo.routes';
import { UserRoutes } from '../collections/users/routes/user.routes';
import { AppRouter } from '../router';
import { ControllerFactory } from './controller.factory';
import { MiddlewareFactory } from './middleware.factory';

export class RouterFactory {
  static create(type?: string): Router {
    switch (type) {
      case 'todo':
        return new TodoRoutes(RouterServiceFactory.create(), ControllerFactory.create('todo'), MiddlewareFactory.create()).routes;
      case 'user':
        return new UserRoutes(RouterServiceFactory.create(), ControllerFactory.create('user')).routes;
      default:
        return new AppRouter(RouterServiceFactory.create()).routes;
    }
  }
}
