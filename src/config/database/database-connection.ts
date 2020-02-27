import { Pool } from 'pg';

export class DatabaseConnection {
  public pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }
}
