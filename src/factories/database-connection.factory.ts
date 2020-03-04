import { DatabaseConnection } from '@danielc7150/express-utils';
import { PoolFactory } from './pool.factory';

export class DatabaseConnectionFactory {
  static create(): DatabaseConnection {
    return new DatabaseConnection(PoolFactory.create());
  }
}
