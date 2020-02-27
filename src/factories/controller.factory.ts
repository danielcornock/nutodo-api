import { TodoController } from '../collections/todos/controller/todo.controller';
import { ServiceFactory } from './service.factory';

export class ControllerFactory {
  static create(controller: string): any {
    switch (controller) {
      case 'todo':
        return new TodoController(ServiceFactory.create('todo'));
    }
  }
}
