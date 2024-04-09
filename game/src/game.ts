import { Player } from './player.js';
//prettier-ignore
import {interactiveObstacles,createObstacles,drawObstacles} from './objects.js';
//prettier-ignore
import {collectItem,updateInventory,useItem,isHoldingItem,cursorItems,inventory,setIsHoldingItem,setCursorItems,getCursorItems, getIsHoldingItem} from './inventory.js';
//prettier-ignore
import {checkCollectibleProximity,showCollectInfo,isCollidingWithObstacle, dragElement, updateHP, startNewGame} from './utils.js';
//prettier-ignore
import { Block, blocks } from './blocks.js';
//prettier-ignore
import { drawCraftingWindow, moveWindow } from './crafting.js';
//prettier-ignore
import { Enemy, initEnemies, enemies } from './enemy.js';
import { mobs } from './mobs.js';

let canvas: HTMLCanvasElement = document.getElementById(
  'gameCanvas'
) as HTMLCanvasElement;
export const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
const infoBox: HTMLElement = document.getElementById('infoBox');
export const inventoryEl: HTMLElement = document.getElementById('inventory');
const backgroundImage: HTMLImageElement = new Image();
const crafingIcon: HTMLElement = document.querySelector('#crafting');
export const gameOverDiv = document.getElementById('gameOver');
export const craftingWindow: HTMLElement =
  document.querySelector('#craftingWindow');
const closeCraftingButton: HTMLElement = document.querySelector(
  '#closeCraftingButton'
);
backgroundImage.src = 'assets/grass.webp';
backgroundImage.onload = function () {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
};

canvas.width = window.innerWidth * 0.96;
canvas.height = window.innerHeight * 0.9;
const playerImg: HTMLImageElement = new Image();
playerImg.src = 'assets/character.webp';
export const closestEnemies = [];

export let player: Player = new Player(
  ctx,
  playerImg,
  canvas,
  isCollidingWithObstacle,
  interactiveObstacles,
  showCollectInfo,
  collectItem,
  updateInventory,
  setIsHoldingItem,
  getIsHoldingItem,
  setCursorItems,
  getCursorItems,
  cursorItems
);

function clearCanvas(): void {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

initEnemies(mobs[0], 2);
export function updateGame(): void {
  clearCanvas();
  player.move(keysPressed);
  player.drawPlayer();
  enemies.forEach((enemy) => {
    enemy.update();
    enemy.draw();
    checkCollectibleProximity(interactiveObstacles, enemy);
    if (enemy.moveFunctionIsCalled == false) {
      enemy.randomMove(0.5);
    }
  });

  player.isHoldingItem = getIsHoldingItem();
  player.cursorItems = getCursorItems();
  player.closestItem = checkCollectibleProximity;
  player.drawBuildRange();
  drawObstacles(ctx);
  drawCraftingWindow(player, craftingWindow);
  checkCollectibleProximity(interactiveObstacles, player);
  if (player.hp == 0) {
    document.getElementById('night').style.transition = '0.5s';
    document.getElementById('night2').style.transition = '0.5s';
    document.getElementById('night').style.opacity = '100%';
    document.getElementById('night2').style.opacity = '60%';
    document.getElementById('night').style.zIndex = '0';
    document.getElementById('night2').style.zIndex = '0';
    gameOverDiv.style.display = 'flex';
    return;
  }
  player.distanceToEnemies();

  requestAnimationFrame(updateGame);
}

let keysPressed = {};
document.addEventListener('keydown', (event: KeyboardEvent) => {
  keysPressed[event.key] = true;
  player.drawBuildRange();
});
document.addEventListener('keyup', (event: KeyboardEvent) => {
  delete keysPressed[event.key];
  player.functionIsExecuted = false;
});
canvas.addEventListener('mousemove', (event) => {
  player.mouseX = event.offsetX;
  player.mouseY = event.offsetY;
});
canvas.addEventListener('mousedown', (event) => {
  player.build(getCursorItems());
});
crafingIcon.addEventListener('click', () => {
  if (player.isCraftingOpen == false) {
    player.isCraftingOpen = true;
  } else {
    player.isCraftingOpen = false;
  }
});

closeCraftingButton.addEventListener('click', () => {
  player.isCraftingOpen = false;
});

document.addEventListener('contextmenu', (event) => event.preventDefault());
document.addEventListener('click', (event: KeyboardEvent) => {
  if (event.key == 'e' && player.closestItem.interactive == true) {
    player.closestItem.method();
  }
});
enemies.forEach((enemy) => {
  enemy.randomizer();
});

const restartGameButton = document.getElementById('restartGame');
restartGameButton.addEventListener('mousedown', startNewGame);

dragElement(craftingWindow, craftingWindow);
createObstacles(30);
updateInventory();
updateGame();
updateHP();
