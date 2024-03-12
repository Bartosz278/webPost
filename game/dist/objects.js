export const interactiveObstacles = [];
import { blocks } from './blocks.js';
export function createObstacles(quantity, neededBlock) {
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
        if (neededBlock) {
            chosenBlock = neededBlock;
        }
        if (chosenBlock) {
            const obstacle = {
                name: chosenBlock.name,
                x: Math.random() * (window.innerWidth * 0.96 - 20),
                y: Math.random() * (window.innerHeight * 0.9 - 20),
                height: chosenBlock.height,
                width: chosenBlock.width,
                digTime: chosenBlock.digTime,
                interactive: chosenBlock.interactive,
                count: 0,
                image: new Image(),
                canPlace: chosenBlock.canPlace,
                canCollect: chosenBlock.canCollect,
                type: chosenBlock.type
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
