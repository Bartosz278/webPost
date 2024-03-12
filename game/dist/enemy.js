var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { player } from './game.js';
import { destroyObstacle, isCollidingWithObstacle, updateHP } from './utils.js';
import { interactiveObstacles } from './objects.js';
export class Enemy {
    constructor(name, x, y, height, width, image, health, speed, interactiveObstacles, isCollidingWithObstacle, damge) {
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
        this.distance = Math.sqrt(Math.pow((player.x + 15 - this.x - this.width / 2), 2) +
            Math.pow((player.y + 15 - this.y - this.height / 2), 2));
        if (this.moveFunctionIsCalled) {
            let newX = this.x;
            let newY = this.y;
            if (Math.abs(player.x - 25) > this.x) {
                newX += this.speed;
            }
            else if (Math.abs(player.x + 25) < this.x) {
                newX -= this.speed;
            }
            if (Math.abs(player.y + 25) < this.y) {
                newY -= this.speed;
            }
            else if (Math.abs(player.y - 25) > this.y) {
                newY += this.speed;
            }
            if (!this.isCollidingWithObstacle(this.interactiveObstacles, newX, newY)) {
                this.x = newX;
                this.y = newY;
                if (this.distance < 60) {
                    this.attack();
                }
            }
            else {
                let alternativeY = player.y > this.y ? this.y + this.speed : this.y - this.speed;
                if (!this.isCollidingWithObstacle(this.interactiveObstacles, this.x, alternativeY)) {
                    this.y = alternativeY;
                }
                else {
                    let alternativeX = player.x > this.x ? this.x + this.speed : this.x - this.speed;
                    if (!this.isCollidingWithObstacle(this.interactiveObstacles, alternativeX, this.y)) {
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
    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
        }
    }
    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    randomizer() {
        return __awaiter(this, void 0, void 0, function* () {
            this.moveFunctionIsCalled = false;
            this.directionIndex = Math.floor(Math.random() * 4);
            enemies.forEach((enemy) => {
                enemy.chanceToMove = Math.random();
            });
            yield this.delay(Math.random() * 4500);
            this.moveFunctionIsCalled = null;
            yield this.delay(Math.random() * 1400);
            this.moveFunctionIsCalled = true;
            yield this.delay(Math.random() * 1000);
            this.canAttack = true;
            yield this.delay(Math.random() * 5500);
            this.randomizer();
        });
    }
    randomMove(chance) {
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
            if (newY - this.speed <= 0 ||
                newY + this.speed >= player.canvas.height - 30 ||
                newX - this.speed <= 0 ||
                newX + this.speed >= player.canvas.width - 30) {
                return;
            }
            if (!this.isCollidingWithObstacle(this.interactiveObstacles, newX, newY, 'enemy')) {
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
export function initEnemies(mob, quantity) {
    mob.image.src = `assets/${mob.name}.webp`;
    for (let i = 0; i < quantity; i++) {
        const x = Math.random() * player.canvas.width;
        const y = Math.random() * player.canvas.height;
        let enemy = new Enemy(mob.name, x, y, mob.width, mob.height, mob.image, mob.health, mob.speed, interactiveObstacles, isCollidingWithObstacle, mob.damage);
        enemies.push(enemy);
    }
}
