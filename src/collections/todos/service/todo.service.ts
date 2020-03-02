import { ITodo } from '../interfaces/todo.interface';
import { DatabaseConnection } from 'src/config/database/database-connection';
import knex from 'knex';
import { NotFoundException } from '@danielc7150/express-utils/lib';

export class TodoService {
  private readonly _db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this._db = db;
  }

  public async getAll(): Promise<any> {
    const result: Array<ITodo> = await this._db.query<ITodo>('todos');
    return result;
  }

  public async create(todo: ITodo): Promise<ITodo> {
    const result: Array<ITodo> = await this._db
      .query<ITodo>('todos')
      .returning('*')
      .insert(todo);

    return result[0];
  }

  public async update(id: string, todo: ITodo): Promise<ITodo> {
    const result: Array<ITodo> = await this._db
      .query<ITodo>('todos')
      .where({ id })
      .update(todo)
      .returning('*');

    return result[0];
  }

  public async getOne(id: string): Promise<ITodo> {
    const result: ITodo = (await this._db
      .query<ITodo>('todos')
      .where({ id })
      .first()) as ITodo;

    if (!result) {
      throw new NotFoundException('This todo cannot be found.');
    }

    return result;
  }

  public async deleteOne(id: string): Promise<void> {
    const count: number = await this._db
      .query<ITodo>('todos')
      .where({ id })
      .delete();

    if (!count) {
      throw new NotFoundException('The todo you are trying to delete cannot be found.');
    }
  }
}
