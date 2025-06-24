import express, { Application, NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import appRoutes from './globals/routes/appRoutes';
import { CustomError, NotFoundException } from './globals/cores/error.core';
import HTTP_STATUS from './globals/constants/http.constant';

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
      // return res.status(404).json({
      //   message: `The URL ${req.originalUrl} not found with method ${req.method}`
      // });
      next(new NotFoundException(`The URL ${req.originalUrl} not found with method ${req.method}`));
    });

    this.app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
      console.log(error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({
          message: error.message
        });
      }

      return res.status(HTTP_STATUS.INTERNAL_SERVER).json({
        message: 'Something went wrong'
      });
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
