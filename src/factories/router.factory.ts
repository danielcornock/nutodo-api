import { AppRouter } from '../router';
import { Router } from 'express';
import { TodoRoutes } from '../collections/todos/todo.routes';

export class RouterFactory {
  static create(type?: string): Router {
    const coreRouter: Router = Router({ mergeParams: true });

    switch (type) {
      case 'todo':
        return new TodoRoutes(coreRouter).routes;
      default:
        return new AppRouter(coreRouter).routes;
    }
  }
}
