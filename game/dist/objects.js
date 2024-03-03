export const interactiveObstacles = [];
import { blocks } from './blocks.js';
export function createObstacles(canvas, quantity) {
    for (let i = 0; i < quantity; i++) {
        const randomNumber = Math.floor(Math.random() * 100);
        let chosenBlock;
        let accumulatedSpawnChance = 0;
        for (const block of blocks) {
            accumulatedSpawnChance += block.spawnChance;
            if (randomNumber < accumulatedSpawnChance) {
                chosenBlock = block;
                break;
            }
        }
        if (chosenBlock) {
            const obstacle = {
                name: chosenBlock.name,
                x: Math.random() * (window.innerWidth * 0.9 - 20),
                y: Math.random() * (window.innerHeight * 0.75 - 20),
                height: chosenBlock.height,
                width: chosenBlock.width,
                digTime: chosenBlock.diggingTime,
                interactive: chosenBlock.interactive,
                count: 0,
                image: new Image(),
                canPlace: chosenBlock.canPlace
            };
            obstacle.image.src = `assets/${obstacle.name}.webp`;
            interactiveObstacles.push(obstacle);
        }
    }
}
export function drawObstacles(ctx) {
    interactiveObstacles.forEach(function (obstacle) {
        ctx.drawImage(obstacle.image, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}
