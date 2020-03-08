import { TodoService } from '../collections/todos/service/todo.service';
import { DatabaseConnectionFactory } from './database-connection.factory';
import { UserService } from '../collections/users/service/user.service';
import { DatabaseConnection } from '@danielc7150/express-utils';

export class ServiceFactory {
  static create(type: string): any {
    const databaseConnection: DatabaseConnection = DatabaseConnectionFactory.create();

    switch (type) {
      case 'todo':
        return new TodoService(databaseConnection);
      case 'user':
        return new UserService(databaseConnection);
    }
  }
}
