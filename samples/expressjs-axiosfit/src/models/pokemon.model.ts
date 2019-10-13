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
  STEEL = 'Steel'
}

export interface PokemonName {
  english: string;
  japanese?: string;
  chinese?: string;
  french?: string;
}

export interface PokemonBase {
  HP: Number;
  Attack: Number;
  Defense: Number;
  'SP. Attack': Number;
  'SP. Defence': Number;
  Speed: Number;
}

export interface Pokemon {
  id: Number;
  name: PokemonName;
  type: PokemonType;
  base: PokemonBase;
}
