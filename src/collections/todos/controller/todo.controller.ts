import { IReq, IRes, ResponseFactory } from '@danielc7150/express-utils';

import { TODO_DOCUMENT_NAMES } from '../constants/todo-document-names.constant';
import { TodoRequest } from '../data-objects/todo-request';
import { TodoResponse } from '../data-objects/todo-response';
import { todoTemplate } from '../data-objects/todo-template';
import { TodoService } from '../service/todo.service';

export class TodoController {
  private readonly _todoService: TodoService;
  private readonly _responseFactory: ResponseFactory;

  constructor(todoService: TodoService) {
    this._todoService = todoService;
    this._responseFactory = ResponseFactory.create(TODO_DOCUMENT_NAMES.plural);
  }

  public async getAll(req: IReq, res: IRes): Promise<void> {
    const todos: Array<TodoResponse> = await this._todoService.getAll(req.user.id);

    this._responseFactory.successFind(res, {
      data: { todos },
      name: TODO_DOCUMENT_NAMES.plural
    });
  }

  public async create(req: IReq, res: IRes): Promise<void> {
    const reqTodo: TodoRequest = new TodoRequest(req.body);

    const todo: TodoResponse = await this._todoService.create(reqTodo, req.user.id);

    this._responseFactory.successCreate(res, {
      data: { todo },
      name: TODO_DOCUMENT_NAMES.singular
    });
  }

  public async update(req: IReq, res: IRes): Promise<void> {
    const todoUpdate: TodoRequest = new TodoRequest(req.body);

    const todo: TodoResponse = await this._todoService.update(req.params.id, todoUpdate, req.user.id);

    this._responseFactory.successCreate(res, {
      data: { todo },
      name: TODO_DOCUMENT_NAMES.singular
    });
  }

  public async getOne(req: IReq, res: IRes): Promise<void> {
    const todo: TodoResponse = await this._todoService.getOne(req.params.id, req.user.id);

    this._responseFactory.successFind(res, {
      data: { todo },
      name: TODO_DOCUMENT_NAMES.singular
    });
  }

  public async deleteOne(req: IReq, res: IRes): Promise<void> {
    await this._todoService.deleteOne(req.params.id, req.user.id);

    this._responseFactory.successDelete(res);
  }

  public getTemplate(_req: IReq, res: IRes): void {
    this._responseFactory.successFind(res, {
      data: { todoTemplate: todoTemplate as any },
      name: 'todoTemplate',
      selfLinkOverride: 'todos'
    });
  }
}
