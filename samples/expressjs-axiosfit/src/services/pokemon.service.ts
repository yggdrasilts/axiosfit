import { Request, Response } from 'express';
import { Axiosfit } from '@yggdrasilts/axiosfit';

import { IPokemonService } from '../interfaces/pokemon-service.interface';
import { PokedexService } from './pokedex.axiosfit.service';
import { Pokemon } from '../models/pokemon.model';

export class PokeService implements IPokemonService {
  private static pokedexService = new Axiosfit<PokedexService>()
    .baseUrl('http://localhost:3000')
    .create(PokedexService);

  public getAllPokemon(req: Request, res: Response) {
    PokeService.pokedexService
      .getAllPokemons()
      .subscribe(
        axiosResponse => res.json(axiosResponse.data),
        error => res.send(error)
      );
  }

  public addNewPokemon(req: Request, res: Response) {
    const newPokemon: Pokemon = req.body;
    PokeService.pokedexService
      .createPokemon(newPokemon)
      .subscribe(
        axiosResponse => res.json(axiosResponse.data),
        error => res.send(error)
      );
  }

  public deletePokemon(req: Request, res: Response) {
    const pokemonID = req.params.id;
    PokeService.pokedexService
      .deletePokemon(pokemonID)
      .subscribe(
        () => res.status(200).send(`Pokemon with ID ${pokemonID} deleted.`),
        error => res.send(error)
      );
  }

  public updatePokemon(req: Request, res: Response) {
    const pokemonId = req.params.id;
    const pokemonData: Pokemon = req.body;
    PokeService.pokedexService
      .updatePokemon(pokemonId, pokemonData)
      .subscribe(
        axiosResponse => res.send('Updated successfully.'),
        error => res.send(error)
      );
  }
}
