import express from 'express';
import { AppFactory } from './factories/app.factory';
import * as config from './config/config';

const app: express.Application = AppFactory.create();

app.listen(config.port || 2400, () => {
  // tslint:disable-next-line: no-console
  console.log(`[!] Server started on port ${config.port}`);
});
