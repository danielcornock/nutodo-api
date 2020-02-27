import { App } from '../app';
import express from 'express';
import { DatabaseConnectionFactory } from './database-connection.factory';

export class AppFactory {
  static create(): express.Application {
    return new App(express()).app;
  }
}
