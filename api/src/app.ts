import express from 'express';
import cors from 'cors';
import { resolve } from 'path';
import socketio from 'socket.io';
import { Server } from 'http';

import routes from './routes';
import './database';

class App {
  private app: express.Application;

  public server: Server;

  private io: socketio.Server;

  private connectedUsers: Record<string, any>;

  public constructor() {
    this.app = express();
    this.server = new Server(this.app);

    this.middlewares();
    this.routes();
    this.initSocket();
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );

    this.app.use((req, res, next) => {
      req.io = this.io;
      req.connectedUsers = this.connectedUsers;

      return next();
    });
  }

  private routes(): void {
    this.app.use(routes);
  }

  private initSocket(): void {
    this.io = socketio(this.server);

    this.connectedUsers = {};

    this.io.on('connection', socket => {
      const { user_id } = socket.handshake.query;
      this.connectedUsers[user_id] = socket.id;
    });
  }
}

export default new App().server;
