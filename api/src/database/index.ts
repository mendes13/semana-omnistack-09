import mongoose from 'mongoose';

class Database {
  public constructor() {
    this.init();
  }

  init(): void {
    mongoose.connect('mongodb://localhost:27017/air-cnc', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
