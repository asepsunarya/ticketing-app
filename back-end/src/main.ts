import { Express } from 'express';
import * as express from 'express';
import * as expressFileUpload from 'express-fileupload';
import * as timeout from 'connect-timeout';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { adminServer, authServer } from './functions-http';

dotenv.config();

const PORT = 1000;
const server: Express = express();

server.use(
  expressFileUpload({
    limits: { fileSize: 8 * (1024 * 1024) },
    abortOnLimit: true,
  }),
);

server.use(timeout('300s'));
server.use(bodyParser.json({ limit: '25mb' }));
server.use(bodyParser.urlencoded({ limit: '25mb', extended: true }));

server.use('/admin', adminServer.start());
server.use('/auth', authServer.start());

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at port ${PORT}`, new Date());
});
