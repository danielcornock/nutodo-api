import { DatabaseConnection } from '../config/database/database-connection';
import { Pool } from 'pg';
import { PoolFactory } from './pool.factory';

export class DatabaseConnectionFactory {
  static create(): Pool {
    return new DatabaseConnection(PoolFactory.create()).pool;
  }
}
