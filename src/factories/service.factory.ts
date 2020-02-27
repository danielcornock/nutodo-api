import { TodoService } from '../collections/todos/service/todo.service';
import { DatabaseConnectionFactory } from './database-connection.factory';

export class ServiceFactory {
  static create(type: string): any {
    switch (type) {
      case 'todo':
        return new TodoService(DatabaseConnectionFactory.create());
    }
  }
}
