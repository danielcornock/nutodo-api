import { AppRouter } from '../router';
import { Router } from 'express';
import { TodoRoutes } from '../collections/todos/routes/todo.routes';
import { ControllerFactory } from './controller.factory';

export class RouterFactory {
  static create(type?: string): Router {
    const coreRouter: Router = Router({ mergeParams: true });

    switch (type) {
      case 'todo':
        return new TodoRoutes(coreRouter, ControllerFactory.create('todo')).routes;
      default:
        return new AppRouter(coreRouter).routes;
    }
  }
}
