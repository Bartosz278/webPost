import { Player } from "./player.js";
import { interactiveObstacles, createObstacles, drawObstacles } from "./objects.js";
import { collectItem, updateInventory } from "./inventory.js";
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
let player = new Player(ctx, playerImg, canvas, isCollidingWithObstacle, interactiveObstacles, showCollectInfo, collectItem);
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function updateGame() {
    clearCanvas();
    player.move(keysPressed);
    player.drawPlayer();
    // player.showBuildRange();
    drawObstacles(ctx);
    checkCollectibleProximity(interactiveObstacles, player);
    requestAnimationFrame(updateGame);
}
let keysPressed = {};
document.addEventListener("keypress", (event) => {
    keysPressed[event.key] = true;
    player.showBuildRange();
});
document.addEventListener("keyup", (event) => {
    delete keysPressed[event.key];
});
createObstacles(canvas, 15);
updateInventory();
updateGame();
