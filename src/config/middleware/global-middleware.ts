import express from 'express';
import cors from 'cors';

export class GlobalMiddleware {
  constructor(app: express.Application) {
    this._initialiseMiddleware(app);
  }

  static create(app: express.Application): GlobalMiddleware {
    return new GlobalMiddleware(app);
  }

  private _initialiseMiddleware(app: express.Application): void {
    app.use(
      cors({
        origin: 'http://localhost:4200'
      })
    );
  }
}
