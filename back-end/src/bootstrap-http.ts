import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap(expressInstance: string, module: any, path: string) {
  const app = await NestFactory.create(
    module,
    new ExpressAdapter(expressInstance),
  );
  app.enableCors();
  app.use((req: any, res: any, next: any) => {
    console.log(new Date(), ' ', req.method, ' ', req.path);
    next();
  });

  const config = new DocumentBuilder()
    .setTitle('Boosticket API')
    .setDescription('API Documentation For Boosticket API')
    .setVersion('1.0')
    .addServer(`${process.env.BASE_URL}/${path}/`)
    .addTag('Boosticket')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.init();
}

export class Http {
  private initServer = false;
  private server: any;
  private module: any;
  private name: string;

  constructor(module: any, name: string) {
    this.module = module;
    this.name = name;
    this.server = express();
    this.server;
  }

  start() {
    bootstrap(this.server, this.module, this.name)
      .then(() => {
        this.initServer = true;
        console.log(`Nest ${this.name} Ready`);
      })
      .catch((error) => console.error(error));

    return async (req: any, res: any) => {
      while (!this.initServer) {
        await delay(1500);
        console.log(`waiting ${this.name}`);
      }
      return this.server(req, res);
    };
  }
}

async function delay(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
