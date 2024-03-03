import { Player } from './player.js';
//prettier-ignore
import { interactiveObstacles, createObstacles, drawObstacles } from './objects.js';
//prettier-ignore
import { collectItem, updateInventory, isHoldingItem, cursorItems, setIsHoldingItem, setCursorItems, getCursorItems } from './inventory.js';
//prettier-ignore
import { checkCollectibleProximity, showCollectInfo, isCollidingWithObstacle, dragElement } from './utils.js';
//prettier-ignore
import { drawCraftingWindow } from './crafting.js';
let canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const infoBox = document.getElementById('infoBox');
export const inventoryEl = document.getElementById('inventory');
const backgroundImage = new Image();
const crafingIcon = document.querySelector('#crafting');
export const craftingWindow = document.querySelector('#craftingWindow');
const closeCraftingButton = document.querySelector('#closeCraftingButton');
backgroundImage.src = 'assets/grass.webp';
backgroundImage.onload = function () {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
};
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.85;
const playerImg = new Image();
playerImg.src = 'assets/character.webp';
export let player = new Player(ctx, playerImg, canvas, isCollidingWithObstacle, interactiveObstacles, showCollectInfo, collectItem, updateInventory, setIsHoldingItem, setCursorItems, getCursorItems, cursorItems);
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function updateGame() {
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
document.addEventListener('keypress', (event) => {
    keysPressed[event.key] = true;
    player.drawBuildRange();
});
document.addEventListener('keyup', (event) => {
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
    }
    else {
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
