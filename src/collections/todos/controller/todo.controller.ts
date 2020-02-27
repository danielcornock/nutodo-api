import { IReq, IRes, INext, ResponseFactory, ModelInstance } from '@danielc7150/express-utils/lib';
import { TodoService } from '../service/todo.service';
import { TODO_DOCUMENT_NAMES } from '../constants/todo-document-names.constant';

export class TodoController {
  private readonly _todoService: TodoService;

  constructor(todoService: TodoService) {
    this._todoService = todoService;
  }

  public async getAll(_req: IReq, res: IRes, _next: INext): Promise<void> {
    const todos: any = await this._todoService.getAll();

    ResponseFactory.successFind(res, {
      data: { todos },
      name: TODO_DOCUMENT_NAMES.plural
    });
  }

  public async create(req: IReq, res: IRes, _next: INext): Promise<void> {
    const todo: any = await this._todoService.create(req.body);
    ResponseFactory.successCreate(res, {
      data: { todo },
      name: TODO_DOCUMENT_NAMES.singular
    });
  }
}
