import express from 'express';
import cors from 'cors';
import { resolve } from 'path';

import routes from './routes';
import './database';

class App {
  public server: express.Application;

  public constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  private routes(): void {
    this.server.use(routes);
  }
}

export default new App().server;
