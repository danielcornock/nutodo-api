import { BaseRoutes, IReq, IRes, RouterService } from '@danielc7150/express-utils';
import { Router } from 'express';
import { TodoController } from '../controller/todo.controller';

export class TodoRoutes extends BaseRoutes<TodoController> {
  constructor(routerService: RouterService, todoController: TodoController) {
    super(routerService, todoController);
    this._assignRoutes();
  }

  private _assignRoutes(): void {
    this.router.get('/:id', (req: IReq, res: IRes) => this.controller.getOne(req, res));
    this.router.get('/', (req: IReq, res: IRes) => this.controller.getAll(req, res));
    this.router.put('/:id', (req: IReq, res: IRes) => this.controller.update(req, res));
    this.router.post('/', (req: IReq, res: IRes) => this.controller.create(req, res));
    this.router.delete('/:id', (req: IReq, res: IRes) => this.controller.deleteOne(req, res));
  }
}
