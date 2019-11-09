import {
  Observable,
  AxiosResponse,
  HTTP,
  POST,
  Body,
  GET,
  Path,
  PUT,
  DELETE,
} from '@yggdrasilts/axiosfit';

import { Pokemon } from '../models/pokemon.model';

@HTTP('/pokedex')
export class PokedexService {
  @GET('/:id')
  public getPokemon(
    @Path('id') id: string,
  ): Observable<AxiosResponse<Pokemon>> {
    return null;
  }

  @GET('/')
  public getAllPokemons(): Observable<AxiosResponse<Pokemon[]>> {
    return null;
  }

  @POST('/')
  public createPokemon(
    @Body() data: Pokemon,
  ): Observable<AxiosResponse<Pokemon>> {
    return null;
  }

  @PUT('/:id')
  public updatePokemon(
    @Path('id') id: string,
    @Body() data: Pokemon,
  ): Observable<AxiosResponse<Pokemon>> {
    return null;
  }

  @DELETE('/:id')
  public deletePokemon(
    @Path('id') id: string,
  ): Observable<AxiosResponse<void>> {
    return null;
  }
}
