export enum PokemonType {
  GRASS = 'Grass',
  POISON = 'Poison',
  FIRE = 'Fire',
  FLYING = 'Flying',
  WATER = 'Water',
  BUG = 'Bug',
  NORMAL = 'Normal',
  ELECTRIC = 'Electric',
  GROUND = 'Ground',
  FAIRY = 'Fairy',
  ICE = 'Ice',
  DRAGON = 'Dragon',
  FIGHTING = 'Fighting',
  PSYCHIC = 'Psychic',
  ROCK = 'Rock',
  GHOST = 'Ghost',
  DARK = 'Dark',
  STEEL = 'Steel',
}

export interface PokemonName {
  english: string;
  japanese?: string;
  chinese?: string;
  french?: string;
}

export interface PokemonBase {
  HP: number;
  Attack: number;
  Defense: number;
  'SP. Attack': number;
  'SP. Defence': number;
  Speed: number;
}

export interface Pokemon {
  id: number;
  name: PokemonName;
  type: PokemonType;
  base: PokemonBase;
}
