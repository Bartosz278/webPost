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
import { destroyObstacle } from './utils.js';
import { enemies } from './game.js';
export class Enemy {
    constructor(name, x, y, height, width, image, health, speed, interactiveObstacles, isCollidingWithObstacle) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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
    }
    draw() {
        player.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    update() {
        if (this.moveFunctionIsCalled) {
            let newX = this.x;
            let newY = this.y;
            if (Math.abs(player.x - 50) > this.x) {
                newX += this.speed;
            }
            else if (Math.abs(player.x + 30) < this.x) {
                newX -= this.speed;
            }
            if (Math.abs(player.y + 30) < this.y) {
                newY -= this.speed;
            }
            else if (Math.abs(player.y - 50) > this.y) {
                newY += this.speed;
            }
            if (!this.isCollidingWithObstacle(this.interactiveObstacles, newX, newY, 'enemy')) {
                this.x = newX;
                this.y = newY;
            }
            else {
                let alternativeY = player.y > this.y ? this.y + this.speed : this.y - this.speed;
                if (!this.isCollidingWithObstacle(this.interactiveObstacles, this.x, alternativeY, 'enemy')) {
                    this.y = alternativeY;
                }
                else {
                    let alternativeX = player.x > this.x ? this.x + this.speed : this.x - this.speed;
                    if (!this.isCollidingWithObstacle(this.interactiveObstacles, alternativeX, this.y, 'enemy')) {
                        this.x = alternativeX;
                    }
                }
            }
            if (this.isCollidingWithObstacle(this.interactiveObstacles, newX, newY)) {
                this.destroyObstacle();
            }
        }
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
            if (!this.isCollidingWithObstacle(this.interactiveObstacles, newX, newY, 'enemy')) {
                this.x = newX;
                this.y = newY;
            }
        }
    }
}
