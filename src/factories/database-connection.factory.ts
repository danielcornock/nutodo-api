import { DatabaseConnection } from '../config/database/database-connection';
import { Pool } from 'pg';

export class DatabaseConnectionFactory {
  static create(): Pool {
    return new DatabaseConnection().pool;
  }
}
