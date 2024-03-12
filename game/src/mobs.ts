import { player } from './game.js';
import { destroyObstacle, isCollidingWithObstacle, updateHP } from './utils.js';
import { interactiveObstacles } from './objects.js';
import { Obstacle } from './player.js';

export interface Mob {
  name: string;
  height: number;
  width: number;
  image: HTMLImageElement;
  health: number;
  speed: number;
  damage: number;
}

export const mobs: Mob[] = [
  {
    name: 'goblin',
    height: 40,
    width: 40,
    image: new Image(),
    health: 100,
    speed: 0.5,
    damage: 4
  }
];
