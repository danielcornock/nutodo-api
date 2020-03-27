import { RouterService } from '@danielc7150/express-utils';

import { AuthMiddleware } from '../../../config/middleware/authentication/auth-middleware';
import { GuardedRoutes } from '../../../config/routes/guarded.routes';
import { TodoController } from '../controller/todo.controller';

export class TodoRoutes extends GuardedRoutes<TodoController> {
  constructor(routerService: RouterService, todoController: TodoController, authMiddleware: AuthMiddleware) {
    super(routerService, todoController, authMiddleware);
    this._assignRoutes(todoController);
  }

  private _assignRoutes(controller: TodoController): void {
    this.router.get('/template', controller.getTemplate.bind(controller));
    this.router.get('/:id', controller.getOne.bind(controller));
    this.router.get('/', controller.getAll.bind(controller));
    this.router.put('/:id', controller.update.bind(controller));
    this.router.post('/', controller.create.bind(controller));
    this.router.delete('/:id', controller.deleteOne.bind(controller));
  }
}
