import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';

import { Controller } from './controllers/main.controller';
import { PokeService } from './services/pokemon.service';

class App {
  public app: Application;
  public pokeController: Controller;

  constructor() {
    this.app = express();
    this._setConfig();

    this.pokeController = new Controller(this.app, new PokeService());
  }

  private _setConfig(): void {
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    this.app.use(cors());
  }
}

export default new App().app;
