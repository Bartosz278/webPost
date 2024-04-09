import { player } from './game.js';
import { destroyObstacle, isCollidingWithObstacle, updateHP } from './utils.js';
import { interactiveObstacles } from './objects.js';
import { Obstacle } from './player.js';
import { Mob } from './mobs.js';
export class Enemy {
  name: string;
  x: number;
  y: number;
  height: number;
  width: number;
  digTime: number;
  interactive: boolean;
  count: number;
  image: HTMLImageElement;
  health: number;
  speed: number;
  canPlace: boolean;
  canCollect: boolean;
  interactiveObstacles: Obstacle[];
  type: string;
  isCollidingWithObstacle: (
    obstacles: Obstacle[],
    x: number,
    y: number,
    collidingType?: string
  ) => boolean;
  method?: () => void;
  closestItem: Obstacle;
  moveFunctionIsCalled: boolean;
  directionIndex: number;
  chanceToMove: number;
  destroyObstacle: () => void;
  strength: number;
  distance: number;
  canAttack: boolean;
  damage: number;
  canDestroy: boolean;

  constructor(
    name: string,
    x: number,
    y: number,
    height: number,
    width: number,
    image: HTMLImageElement,
    health: number,
    speed: number,
    interactiveObstacles: Obstacle[],
    isCollidingWithObstacle: (
      obstacles: Obstacle[],
      x: number,
      y: number
    ) => boolean,
    damge: number
  ) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.x = x + this.width / 2;
    this.y = y + this.height / 2;
    this.image = image;
    this.health = health;
    this.speed = speed;
    this.canCollect = false;
    this.interactiveObstacles = interactiveObstacles;
    this.isCollidingWithObstacle = isCollidingWithObstacle;
    this.type = 'enemy';
    this.moveFunctionIsCalled = true;
    this.destroyObstacle = destroyObstacle;
    this.strength = 0.5;
    this.canAttack = true;
    this.damage = damge;
    this.canDestroy = true;
  }

  draw() {
    player.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update() {
    if (this.health <= 0) {
      let remove = enemies.findIndex((enemy) => enemy.x === this.x);

      if (remove !== -1) {
        enemies.splice(remove, 1);
      }
    }
    this.distance = Math.sqrt(
      (player.x + 15 - this.x - this.width / 2) ** 2 +
        (player.y + 15 - this.y - this.height / 2) ** 2
    );
    if (this.moveFunctionIsCalled) {
      let newX = this.x;
      let newY = this.y;

      if (Math.abs(player.x - 25) > this.x) {
        newX += this.speed;
      } else if (Math.abs(player.x + 25) < this.x) {
        newX -= this.speed;
      }
      if (Math.abs(player.y + 25) < this.y) {
        newY -= this.speed;
      } else if (Math.abs(player.y - 25) > this.y) {
        newY += this.speed;
      }

      if (
        !this.isCollidingWithObstacle(this.interactiveObstacles, newX, newY)
      ) {
        this.x = newX;
        this.y = newY;
        if (this.distance < 40) {
          this.attack();
        }
      } else {
        let alternativeY =
          player.y > this.y ? this.y + this.speed : this.y - this.speed;
        if (
          !this.isCollidingWithObstacle(
            this.interactiveObstacles,
            this.x,
            alternativeY
          )
        ) {
          this.y = alternativeY;
        } else {
          let alternativeX =
            player.x > this.x ? this.x + this.speed : this.x - this.speed;
          if (
            !this.isCollidingWithObstacle(
              this.interactiveObstacles,
              alternativeX,
              this.y
            )
          ) {
            this.x = alternativeX;
          }
        }
      }
      if (this.isCollidingWithObstacle(this.interactiveObstacles, newX, newY)) {
        this.destroyObstacle();
      }
    }
    player.ctx.fillStyle = 'red';
    player.ctx.fillRect(this.x, this.y - 12, this.health / 2.5, 5);
    player.ctx.stroke();
  }
  takeDamage(amount: number) {
    this.health -= amount;
    if (this.health <= 0) {
    }
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async randomizer() {
    this.moveFunctionIsCalled = false;
    this.directionIndex = Math.floor(Math.random() * 4);
    enemies.forEach((enemy) => {
      enemy.chanceToMove = Math.random();
    });
    await this.delay(Math.random() * 4500);
    this.moveFunctionIsCalled = null;
    await this.delay(Math.random() * 1400);
    this.moveFunctionIsCalled = true;
    await this.delay(Math.random() * 1000);
    this.canAttack = true;
    await this.delay(Math.random() * 5500);
    this.randomizer();
  }

  randomMove(chance: number) {
    if (this.chanceToMove < chance) {
      let directions = [
        { dx: this.speed, dy: 0 }, // prawo
        { dx: -this.speed, dy: 0 }, // lewo
        { dx: 0, dy: this.speed }, // dół
        { dx: 0, dy: -this.speed } // góra
      ];

      let direction = directions[this.directionIndex];
      let newX = this.x + direction.dx;
      let newY = this.y + direction.dy;
      if (
        newY - this.speed <= 0 ||
        newY + this.speed >= player.canvas.height - 30 ||
        newX - this.speed <= 0 ||
        newX + this.speed >= player.canvas.width - 30
      ) {
        return;
      }
      if (
        !this.isCollidingWithObstacle(
          this.interactiveObstacles,
          newX,
          newY,
          'enemy'
        )
      ) {
        this.x = newX;
        this.y = newY;
      }
    }
  }

  attack() {
    if (this.canAttack) {
      player.hp -= this.damage;
      if (player.hp < 0) {
        player.hp = 0;
      }
      player.getDamage = true;
      player.getDamageMove(this.x, this.y);
      this.canAttack = false;
      updateHP(this.damage);
    }
  }
}
export let enemies = [];
export function initEnemies(mob: Mob, quantity: number) {
  mob.image.src = `assets/${mob.name}.webp`;

  for (let i = 0; i < quantity; i++) {
    const x = Math.random() * player.canvas.width;
    const y = Math.random() * player.canvas.height;

    let enemy = new Enemy(
      mob.name,
      x,
      y,
      mob.width,
      mob.height,
      mob.image,
      mob.health,
      mob.speed,
      interactiveObstacles,
      isCollidingWithObstacle,
      mob.damage
    );
    enemies.push(enemy);
  }
}
