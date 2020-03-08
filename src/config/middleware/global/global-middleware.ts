import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

export class GlobalMiddleware {
  constructor(app: express.Application) {
    this._initialiseMiddleware(app);
  }

  static create(app: express.Application): GlobalMiddleware {
    return new GlobalMiddleware(app);
  }

  private _initialiseMiddleware(app: express.Application): void {
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(
      cors({
        origin: 'http://localhost:4200'
      })
    );
  }
}
