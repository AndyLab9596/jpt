import express, { Application } from 'express';

interface IServer {
  listenServer(): void;
}

class Server implements IServer {
  private app: Application;
  constructor() {
    this.app = express();
  }

  public listenServer() {
    const port = 5000;
    this.app.listen(port, () => {
      console.log(`Connected to server with port ${port}`);
    });
  }
}

export default Server;
