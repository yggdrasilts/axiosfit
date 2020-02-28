import App from './app';

// Middlewares
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

// Controllers
import { Controller } from './controllers/main.controller';

// Services
import { PokeService } from './services/pokemon.service';

// Configurations
const HOST = process.env.HOST || 'localhost';
const PORT = Number(process.env.PORT) || 9001;

const app = new App({
  host: HOST,
  port: PORT,
  controllers: [new Controller(new PokeService())],
  middleWares: [
    morgan(':method :url :status :res[content-length] - :response-time ms'),
    bodyParser.json(),
    bodyParser.urlencoded({ limit: '50mb', extended: true }),
    cors(),
  ],
});

app.listen();
