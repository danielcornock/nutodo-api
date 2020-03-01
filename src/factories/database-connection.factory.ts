import { DatabaseConnection } from '../config/database/database-connection';
import { PoolFactory } from './pool.factory';

export class DatabaseConnectionFactory {
  static create(): DatabaseConnection {
    return new DatabaseConnection(PoolFactory.create());
  }
}
