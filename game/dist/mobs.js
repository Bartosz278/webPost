import { Enemy } from './enemy.js';
import { player } from './game.js';
import { interactiveObstacles } from './objects.js';
import { isCollidingWithObstacle } from './utils.js';
export function initEnemies() {
    const enemyImage = new Image();
    enemyImage.src = 'assets/goblin.webp';
    let enemies = [];
    for (let i = 0; i < 5; i++) {
        let name = 'goblin';
        const x = Math.random() * player.canvas.width;
        const y = Math.random() * player.canvas.height;
        const health = 100;
        const speed = 0.5;
        const width = 40;
        const height = 40;
        const isCollidingWithObstacle2 = isCollidingWithObstacle;
        let enemy = new Enemy(name, x, y, width, height, enemyImage, health, speed, interactiveObstacles, isCollidingWithObstacle2);
        enemies.push(enemy);
    }
    return enemies;
}
