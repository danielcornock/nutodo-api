import {
  HttpException,
  INext,
  InternalServerErrorException,
  IReq,
  IRes,
  Logger,
  ResponseFactory,
} from '@danielc7150/express-utils';
import express from 'express';

export class ErrorController {
  private readonly _app: express.Application;
  private readonly _responseFactory: ResponseFactory;

  constructor(app: express.Application) {
    this._app = app;
    this._responseFactory = ResponseFactory.create('error');
  }

  public handleErrors(): void {
    this._app.use((error: HttpException, _req: IReq, res: IRes, _next: INext) => {
      if (error.statusCode) {
        this._responseFactory.error(res, error);
      } else {
        Logger.console(error);
        this._responseFactory.error(res, new InternalServerErrorException());
      }
    });
  }
}
