import { Player } from './player.js';
//prettier-ignore
import {interactiveObstacles,createObstacles,drawObstacles} from './objects.js';
//prettier-ignore
import {collectItem,updateInventory,useItem,isHoldingItem,cursorItems,inventory,setIsHoldingItem,setCursorItems,getCursorItems} from './inventory.js';
//prettier-ignore
import {checkCollectibleProximity,showCollectInfo,isCollidingWithObstacle, dragElement} from './utils.js';
//prettier-ignore
import { Block, blocks } from './blocks.js';
//prettier-ignore
import { drawCraftingWindow, moveWindow } from './crafting.js';

let canvas: HTMLCanvasElement = document.getElementById(
  'gameCanvas'
) as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
const infoBox: HTMLElement = document.getElementById('infoBox');
export const inventoryEl: HTMLElement = document.getElementById('inventory');
const backgroundImage: HTMLImageElement = new Image();
const crafingIcon: HTMLElement = document.querySelector('#crafting');
export const craftingWindow: HTMLElement =
  document.querySelector('#craftingWindow');
const closeCraftingButton: HTMLElement = document.querySelector(
  '#closeCraftingButton'
);
backgroundImage.src = 'assets/grass.webp';
backgroundImage.onload = function () {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
};

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.85;
const playerImg: HTMLImageElement = new Image();
playerImg.src = 'assets/character.webp';

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
  setCursorItems,
  getCursorItems,
  cursorItems
);

function clearCanvas(): void {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateGame(): void {
  clearCanvas();
  player.move(keysPressed);
  player.drawPlayer();
  player.drawBuildRange();
  player.isHoldingItem = isHoldingItem;
  player.cursorItems = getCursorItems();
  drawObstacles(ctx);
  drawCraftingWindow(player, craftingWindow);
  checkCollectibleProximity(interactiveObstacles, player);
  requestAnimationFrame(updateGame);
}

let keysPressed = {};
document.addEventListener('keypress', (event: KeyboardEvent) => {
  keysPressed[event.key] = true;
  player.drawBuildRange();
});
document.addEventListener('keyup', (event: KeyboardEvent) => {
  delete keysPressed[event.key];
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

dragElement(craftingWindow, craftingWindow);
createObstacles(canvas, 25);
updateInventory();
updateGame();
