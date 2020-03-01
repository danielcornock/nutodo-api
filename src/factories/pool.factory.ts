import knex from 'knex';

const knexPool: knex = knex({
  client: 'postgres',
  connection: {
    user: 'danielcornock',
    database: 'danielcornock'
  }
});

export class PoolFactory {
  static create(): knex {
    return knexPool;
  }
}
