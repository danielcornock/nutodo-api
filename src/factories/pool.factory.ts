import { PoolConfig, Pool } from 'pg';

export class PoolFactory {
  static create(): Pool {
    return new Pool({
      user: 'danielcornock',
      database: 'danielcornock'
    });
  }
}
