import { TodoController } from './todo.controller';
import { IReq, IRes, ReqStub, ResStub, StubCreator } from '@danielc7150/express-utils/lib';

describe('TodoController', () => {
  let controller: TodoController, req: IReq, res: IRes;

  beforeEach(() => {
    req = StubCreator.create(ReqStub);
    res = StubCreator.create(ResStub);
    controller = new TodoController();
  });

  describe('when getting all todos', () => {
    beforeEach(() => {
      controller.getAll(req, res);
    });

    it('should return the todos', () => {
      expect(res.send).toHaveBeenCalledWith('todos');
    });
  });
});
