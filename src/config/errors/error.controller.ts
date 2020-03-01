import express from 'express';
import { HttpException, IRes, IReq, INext, ResponseFactory, InternalServerErrorException, Logger } from '@danielc7150/express-utils/lib';

export class ErrorController {
  private readonly _app: express.Application;

  constructor(app: express.Application) {
    this._app = app;
  }

  public handleErrors(): void {
    this._app.use((error: HttpException, _req: IReq, res: IRes, _next: INext) => {
      if (error.statusCode) {
        ResponseFactory.error(res, error);
      } else {
        Logger.console(error);
        ResponseFactory.error(res, new InternalServerErrorException());
      }
    });
  }
}
