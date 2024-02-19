import { Player } from "./player.js";
import {interactiveObstacles,createObstacles,drawObstacles} from "./objects.js";
import { collectItem, updateInventory } from "./inventory.js";
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

let player: Player = new Player(
  ctx,
  playerImg,
  canvas,
  isCollidingWithObstacle,
  interactiveObstacles,
  showCollectInfo,
  collectItem,
);

function clearCanvas(): void {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateGame(): void {
  clearCanvas();
  player.move(keysPressed);
  player.drawPlayer();
  // player.showBuildRange();
  drawObstacles(ctx);
  checkCollectibleProximity(interactiveObstacles, player);
  requestAnimationFrame(updateGame);
  
}

let keysPressed = {};
document.addEventListener("keypress",(event:KeyboardEvent)=>{
  keysPressed[event.key] = true;
  player.showBuildRange();
})
document.addEventListener("keyup",(event:KeyboardEvent)=>{
  delete keysPressed[event.key];
  
})

createObstacles(canvas,15);
updateInventory();
updateGame();