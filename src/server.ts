import express, { Application } from 'express';
import 'dotenv/config';
import appRoutes from './globals/routes/appRoutes';

interface IServer {
  start(): void;
}

class Server implements IServer {
  private app: Application;
  constructor() {
    this.app = express();
  }

  public start(): void {
    this.setupMiddleware();
    this.setupRoutes();
    this.setupGlobalError();
    this.listenServer();
  }

  private setupMiddleware(): void {
    /**
     * The middleware express.json() in Express.js is used to
     * parse incoming JSON requests
     * and put the parsed data in req.body.
     */

    this.app.use(express.json());
  }

  private setupRoutes(): void {
    appRoutes(this.app);
  }

  private setupGlobalError(): void {
    this.app.all('*', (req, res, next) => {
      res.status(404).json({
        message: `The URL ${req.originalUrl} not found with method ${req.method}`
      });

      next();
    });
  }

  private listenServer() {
    const port = process.env.PORT || 5000;
    this.app.listen(port, () => {
      console.log(`Connected to server with port ${port}`);
    });
  }
}

export default Server;
