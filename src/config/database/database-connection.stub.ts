export class DatabaseConnectionStub {
  query: jest.Mock = jest.fn();
}

export class PoolStub {
  returning: jest.Mock = jest.fn();
  where: jest.Mock = jest.fn();
  update: jest.Mock = jest.fn();
  insert: jest.Mock = jest.fn();
  first: jest.Mock = jest.fn();
  delete: jest.Mock = jest.fn();
}
