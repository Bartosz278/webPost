import { blocks } from './blocks.js';
import { player } from './game.js';
import { createObstacles, interactiveObstacles } from './objects.js';
import { showCollectInfo } from './utils.js';
import { initEnemies } from './enemy.js';
import { mobs } from './mobs.js';
export const craftableItems = [
    {
        name: 'wall',
        height: 48,
        width: 33,
        digTime: 1000,
        interactive: false,
        image: new Image(),
        canPlace: true,
        canCollect: true,
        requiredItems: [{ name: 'stone', count: 2 }],
        type: 'block'
    },
    {
        name: 'bed',
        height: 40,
        width: 80,
        digTime: 300,
        interactive: true,
        image: new Image(),
        canPlace: true,
        canCollect: true,
        requiredItems: [{ name: 'tree', count: 4 }],
        method: () => {
            player.day++;
            player.functionIsExecuted = true;
            player.hp = 100 + player.day * 2;
            document.getElementById('night').style.opacity = '100%';
            document.getElementById('night2').style.opacity = '60%';
            document.getElementById('night').style.zIndex = '2';
            document.getElementById('night2').style.zIndex = '2';
            setTimeout(() => {
                document.getElementById('night').style.opacity = '0%';
                document.getElementById('night2').style.opacity = '0%';
                document.getElementById('night').style.zIndex = '-1';
                document.getElementById('night2').style.zIndex = '-1';
                showCollectInfo('days', true, `Day ${player.day}`, player.canvas.width / 2, 10);
                let trees = 0;
                let stone = 0;
                interactiveObstacles.forEach((obstacle) => {
                    if (obstacle.name == 'tree') {
                        trees++;
                    }
                    if (obstacle.name == 'stone') {
                        stone++;
                    }
                });
                if (trees < 15) {
                    createObstacles(5, blocks[0]);
                }
                if (stone < 6) {
                    createObstacles(5, blocks[1]);
                }
            }, 4500);
            setTimeout(() => {
                showCollectInfo('days', false, 'Day 1', player.canvas.width / 2, 10);
                player.functionIsExecuted = false;
            }, 8500);
            setTimeout(() => {
                initEnemies(mobs[0], player.day * 2);
            }, 8500);
        },
        type: 'block'
    },
    {
        name: 'pickaxe',
        height: 40,
        width: 20,
        digTime: 0,
        interactive: true,
        image: new Image(),
        canPlace: true,
        canCollect: true,
        requiredItems: [
            { name: 'tree', count: 4 },
            { name: 'stone', count: 3 }
        ],
        type: 'block'
    }
];
