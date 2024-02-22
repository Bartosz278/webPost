import { Player } from "./player.js";
import {interactiveObstacles,createObstacles,drawObstacles} from "./objects.js";
import { collectItem, updateInventory, useItem, isHoldingItem, cursorItems, inventory } from "./inventory.js";
import {checkCollectibleProximity,showCollectInfo,isCollidingWithObstacle} from "./utils.js";
import { Block,blocks } from "./blocks.js";

let canvas: HTMLCanvasElement = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
const infoBox: HTMLElement = document.getElementById("infoBox");
export const inventoryEl: HTMLElement = document.getElementById("inventory");
const backgroundImage: HTMLImageElement = new Image();
backgroundImage.src = "assets/grass.png";
backgroundImage.onload = function () {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
};

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.85;
const playerImg: HTMLImageElement = new Image();
playerImg.src = "assets/character.png";

export let player: Player = new Player(
  ctx,
  playerImg,
  canvas,
  isCollidingWithObstacle,
  interactiveObstacles,
  showCollectInfo,
  collectItem,
  updateInventory,
  cursorItems,
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
  player.cursorItems =cursorItems;
  drawObstacles(ctx);
  checkCollectibleProximity(interactiveObstacles, player);
  requestAnimationFrame(updateGame);
}

let keysPressed = {};
document.addEventListener("keypress",(event:KeyboardEvent)=>{
  keysPressed[event.key] = true;
  player.drawBuildRange();
})
document.addEventListener("keyup",(event:KeyboardEvent)=>{
  delete keysPressed[event.key];
})
canvas.addEventListener('mousemove',(event)=>{
  player.mouseX = event.offsetX;
  player.mouseY = event.offsetY;
  // console.log(player.mouseX);
  // console.log(player.mouseY);
  
})
canvas.addEventListener('mousedown',(event)=>{
player.build(cursorItems);
  
})

createObstacles(canvas,15);
updateInventory();
updateGame();