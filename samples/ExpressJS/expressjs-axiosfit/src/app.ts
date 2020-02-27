import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';

import logger from './common/logger';

import { Controller } from './controllers/main.controller';
import { PokeService } from './services/pokemon.service';

class App {
  public app: Application;
  public host: string;
  public port: number;
  public pokeController: Controller;

  constructor(appInit: {
    host: string;
    port: number;
    middleWares: any;
    controllers: any;
  }) {
    this.app = express();
    this.host = appInit.host;
    this.port = appInit.port;

    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);

    this._setConfig();

    this.pokeController = new Controller(new PokeService());
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`App listening on the http://${this.host}:${this.port}`);
    });
  }

  private middlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: {
    forEach: (arg0: (controller: any) => void) => void;
  }) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }

  private _setConfig(): void {
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    this.app.use(cors());
  }
}

export default App;
