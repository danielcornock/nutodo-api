import { IReq, IRes, INext, ResponseFactory } from '@danielc7150/express-utils';
import { TodoService } from '../service/todo.service';
import { TODO_DOCUMENT_NAMES } from '../constants/todo-document-names.constant';
import { ITodo } from '../interfaces/todo.interface';

export class TodoController {
  private readonly _todoService: TodoService;

  constructor(todoService: TodoService) {
    this._todoService = todoService;
  }

  public async getAll(_req: IReq, res: IRes): Promise<void> {
    const todos: any = await this._todoService.getAll();

    ResponseFactory.successFind(res, {
      data: { todos },
      name: TODO_DOCUMENT_NAMES.plural
    });
  }

  public async create(req: IReq, res: IRes): Promise<void> {
    const todo: any = await this._todoService.create(req.body);
    ResponseFactory.successCreate(res, {
      data: { todo },
      name: TODO_DOCUMENT_NAMES.singular
    });
  }

  public async update(req: IReq, res: IRes): Promise<void> {
    const todo: ITodo = await this._todoService.update(req.params.id, req.body);
    ResponseFactory.successCreate(res, {
      data: { todo },
      name: TODO_DOCUMENT_NAMES.singular
    });
  }

  public async getOne(req: IReq, res: IRes): Promise<void> {
    const todo: ITodo = await this._todoService.getOne(req.params.id);
    ResponseFactory.successFind(res, {
      data: { todo },
      name: TODO_DOCUMENT_NAMES.singular
    });
  }

  public async deleteOne(req: IReq, res: IRes): Promise<void> {
    await this._todoService.deleteOne(req.params.id);
    ResponseFactory.successDelete(res);
  }
}
