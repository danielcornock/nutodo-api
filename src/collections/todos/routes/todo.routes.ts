import { IReq, IRes, RouterService } from '@danielc7150/express-utils';
import { TodoController } from '../controller/todo.controller';
import { GuardedRoutes } from '../../../config/routes/guarded.routes';
import { AuthMiddleware } from '../../../config/middleware/authentication/auth-middleware';

export class TodoRoutes extends GuardedRoutes<TodoController> {
  constructor(routerService: RouterService, todoController: TodoController, authMiddleware: AuthMiddleware) {
    super(routerService, todoController, authMiddleware);
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
