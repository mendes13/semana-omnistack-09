import socketio from 'socket.io';

declare global {
  namespace Express {
    export interface Request {
      io?: socketio.Server;
      connectedUsers?: Record<string, any>;
    }
  }
}
