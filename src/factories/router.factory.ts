import { AppRouter } from '../router';
import { Router } from 'express';
import { TodoRoutes } from '../collections/todos/routes/todo.routes';
import { ControllerFactory } from './controller.factory';
import { RouterServiceFactory } from '@danielc7150/express-utils';

export class RouterFactory {
  static create(type?: string): Router {
    switch (type) {
      case 'todo':
        return new TodoRoutes(RouterServiceFactory.create(), ControllerFactory.create('todo')).routes;
      default:
        return new AppRouter(RouterServiceFactory.create()).routes;
    }
  }
}
