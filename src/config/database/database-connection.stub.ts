import { Pool } from 'pg';
import { StubCreator } from '@danielc7150/express-utils/lib';

export class DatabaseConnectionStub {
  pool: Pool = StubCreator.create(PoolStub);
}

export class PoolStub {
  query: jest.Mock = jest.fn();
}
