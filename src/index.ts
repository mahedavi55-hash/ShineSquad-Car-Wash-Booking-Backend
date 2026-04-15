import express from 'express';
import cors from 'cors';
import routes from './ports/rest/routes';
import { env } from './config/env';
import { connectDatabase } from './config/database';
import { errorMiddleware } from './ports/rest/middleware/errorMiddleware';
import { appLogger } from './infrastructure/logging/Logger';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('ShineSquad Backend Running');
});

app.get('/api', (_req, res) => {
  res.json({
    success: true,
    message: 'ShineSquad API is running',
  });
});

app.use('/api', routes);
app.use(errorMiddleware);

const startServer = async (): Promise<void> => {
  await connectDatabase();
  app.listen(env.port, () => {
    appLogger.info(`${env.appName} running on port ${env.port}.`);
  });
};

startServer().catch((error) => {
  appLogger.error('Failed to start application.', error);
  process.exit(1);
});

export { app };