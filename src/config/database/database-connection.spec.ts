import { DatabaseConnection } from './database-connection';
import { Pool } from 'pg';
import { StubCreator } from '@danielc7150/express-utils/lib';
import { PoolStub } from './database-connection.stub';

describe('DatabaseConnection', () => {
  let db: DatabaseConnection, pool: Pool;

  beforeEach(() => {
    pool = StubCreator.create(PoolStub);
    db = new DatabaseConnection(pool);
  });

  it('should hold the pool instance', () => {
    expect(db.pool).toBe(pool);
  });
});
