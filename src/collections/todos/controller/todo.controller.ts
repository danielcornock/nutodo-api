import { IReq, IRes, INext } from '@danielc7150/express-utils';

export class TodoController {
  public async getAll(_req: IReq, res: IRes, _next?: INext): Promise<void> {
    res.send('todos');
  }
}
