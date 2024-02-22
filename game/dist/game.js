import { Player } from "./player.js";
import { interactiveObstacles, createObstacles, drawObstacles } from "./objects.js";
import { collectItem, updateInventory, isHoldingItem, cursorItems } from "./inventory.js";
import { checkCollectibleProximity, showCollectInfo, isCollidingWithObstacle } from "./utils.js";
let canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const infoBox = document.getElementById("infoBox");
export const inventoryEl = document.getElementById("inventory");
const backgroundImage = new Image();
backgroundImage.src = "assets/grass.png";
backgroundImage.onload = function () {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
};
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.85;
const playerImg = new Image();
playerImg.src = "assets/character.png";
export let player = new Player(ctx, playerImg, canvas, isCollidingWithObstacle, interactiveObstacles, showCollectInfo, collectItem, updateInventory, cursorItems);
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function updateGame() {
    clearCanvas();
    player.move(keysPressed);
    player.drawPlayer();
    player.drawBuildRange();
    player.isHoldingItem = isHoldingItem;
    player.cursorItems = cursorItems;
    drawObstacles(ctx);
    checkCollectibleProximity(interactiveObstacles, player);
    requestAnimationFrame(updateGame);
}
let keysPressed = {};
document.addEventListener("keypress", (event) => {
    keysPressed[event.key] = true;
    player.drawBuildRange();
});
document.addEventListener("keyup", (event) => {
    delete keysPressed[event.key];
});
canvas.addEventListener('mousemove', (event) => {
    player.mouseX = event.offsetX;
    player.mouseY = event.offsetY;
    // console.log(player.mouseX);
    // console.log(player.mouseY);
});
canvas.addEventListener('mousedown', (event) => {
    player.build(cursorItems);
});
createObstacles(canvas, 15);
updateInventory();
updateGame();
