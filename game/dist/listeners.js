import { player } from './game.js';
let keysPressed = {};
document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
    player.drawBuildRange();
});
document.addEventListener('keyup', (event) => {
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
    }
    else {
        player.isCraftingOpen = false;
    }
});
closeCraftingButton.addEventListener('click', () => {
    player.isCraftingOpen = false;
});
document.addEventListener('contextmenu', (event) => event.preventDefault());
document.addEventListener('click', (event) => {
    if (event.key == 'e' && player.closestItem.interactive == true) {
        player.closestItem.method();
    }
});
enemies.forEach((enemy) => {
    enemy.randomizer();
});
