import { Router } from 'express';

import { IPokemonService } from '../services/ipokemon.service';
import IControllerBase from './ibase.controller';

export class Controller implements IControllerBase {
  public path = '/';
  public router = Router();

  constructor(private pokeService: IPokemonService) {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get('/pokemons', this.pokeService.getAllPokemon);
    this.router.post('/pokemon', this.pokeService.addNewPokemon);
    this.router
      .route('/pokemon/:id')
      .delete(this.pokeService.deletePokemon)
      .put(this.pokeService.updatePokemon);
  }
}
