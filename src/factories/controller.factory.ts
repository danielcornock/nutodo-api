import { TodoController } from '../collections/todos/controller/todo.controller';
import { ServiceFactory } from './service.factory';
import { UserController } from '../collections/users/controller/user.controller';

export class ControllerFactory {
  static create(controller: string): any {
    switch (controller) {
      case 'todo':
        return new TodoController(ServiceFactory.create('todo'));
      case 'user':
        return new UserController(ServiceFactory.create('user'));
    }
  }
}
