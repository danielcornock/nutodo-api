import { App } from '../app';
import express from 'express';

export class AppFactory {
  static create(): express.Application {
    return new App(express()).app;
  }
}
