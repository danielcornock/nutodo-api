import { BaseRoutes, IReq, IRes } from '@danielc7150/express-utils/lib';
import { Router, Request } from 'express';
import { TodoController } from '../controller/todo.controller';

export class TodoRoutes extends BaseRoutes<TodoController> {
  constructor(router: Router, todoController: TodoController) {
    super(router, todoController);
    this._assignRoutes();
  }

  private _assignRoutes(): void {
    this.router.get('/', (...args) => this.controller.getAll(...args));
  }
}
