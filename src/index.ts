import Server from './server';

class JobApplication {
  public run(): void {
    const server = new Server();
    server.listenServer();
  }
}

const jobApplication = new JobApplication();
jobApplication.run();
