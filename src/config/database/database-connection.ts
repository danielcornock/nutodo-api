import { Pool } from 'pg';

export class DatabaseConnection {
  public pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: 'danielcornock',
      database: 'danielcornock'
    });
  }
}
