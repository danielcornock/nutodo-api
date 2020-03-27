import { DatabaseConnection, NotFoundException } from '@danielc7150/express-utils';

import { TodoDBInsert } from '../data-objects/todo-db-insert';
import { TodoRequest } from '../data-objects/todo-request';
import { TodoResponse } from '../data-objects/todo-response';
import { ITodo } from '../interfaces/todo.interface';

export class TodoService {
  private readonly _db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this._db = db;
  }

  public async getAll(user: string): Promise<Array<TodoResponse>> {
    const result: Array<ITodo> = await this._db.query<ITodo>('todos').where({ user });

    return result.map((todo: ITodo) => {
      return new TodoResponse(todo);
    });
  }

  public async create(todo: TodoRequest, user: string): Promise<TodoResponse> {
    const databaseInsert: TodoDBInsert = new TodoDBInsert(todo, user);
    const result: Array<ITodo> = await this._db
      .query<TodoDBInsert>('todos')
      .returning('*')
      .insert(databaseInsert);

    return new TodoResponse(result[0]);
  }

  public async update(id: string, todo: TodoRequest, user: string): Promise<TodoResponse> {
    const databaseInsert: TodoDBInsert = new TodoDBInsert(todo, user);
    const result: Array<ITodo> = (await this._db
      .query<TodoRequest>('todos')
      .where({ id, user })
      .update(databaseInsert)
      .returning('*')) as Array<ITodo>;

    return new TodoResponse(result[0]);
  }

  public async getOne(id: string, user: string): Promise<TodoResponse> {
    const result: ITodo = (await this._db
      .query<ITodo>('todos')
      .where({ id, user })
      .first()) as ITodo;

    if (!result) {
      throw new NotFoundException('This todo cannot be found.');
    }

    return new TodoResponse(result);
  }

  public async deleteOne(id: string, user: string): Promise<void> {
    const count: number = await this._db
      .query<ITodo>('todos')
      .where({ id, user })
      .delete();

    if (!count) {
      throw new NotFoundException('The todo you are trying to delete cannot be found.');
    }
  }
}
