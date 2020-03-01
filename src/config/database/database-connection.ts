import Knex from 'knex';

export class DatabaseConnection {
  public query: Knex;

  constructor(query: Knex) {
    this.query = query;
  }
}
