import { Request, Response } from 'express';

export interface IPokemonService {
  getAllPokemon(req: Request, res: Response): void;

  addNewPokemon(req: Request, res: Response): void;

  deletePokemon(req: Request, res: Response): void;

  updatePokemon(req: Request, res: Response): void;
}
