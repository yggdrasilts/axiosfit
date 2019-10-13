import { Application } from 'express';

import { IPokemonService } from '../interfaces/pokemon-service.interface';
import { PokeService } from '../services/pokemon.service';

export class Controller {
  constructor(private app: Application, private pokeService: IPokemonService) {
    this.routes();
  }

  public routes() {
    this.app.route('/pokemons').get(this.pokeService.getAllPokemon);

    this.app.route('/pokemon').post(this.pokeService.addNewPokemon);

    this.app
      .route('/pokemon/:id')
      .delete(this.pokeService.deletePokemon)
      .put(this.pokeService.updatePokemon);
  }
}
