import { DatabaseConnection } from './database-connection';
import { StubCreator } from '@danielc7150/express-utils/lib';
import { KnexStub } from './database-connection.stub';
import Knex = require('knex');

describe('DatabaseConnection', () => {
  let db: DatabaseConnection, knex: Knex;

  beforeEach(() => {
    knex = StubCreator.create(KnexStub);
    db = new DatabaseConnection(knex);
  });

  it('should hold the knex instance', () => {
    expect(db.query).toBe(knex);
  });
});
