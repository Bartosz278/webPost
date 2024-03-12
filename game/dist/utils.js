var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { player, gameOverDiv, updateGame } from './game.js';
//prettier-ignore
import { interactiveObstacles, createObstacles } from './objects.js';
//prettier-ignore
import { collectItem, updateInventory, inventory, setIsHoldingItem, setCursorItems, getCursorItems } from './inventory.js';
//prettier-ignore
import { enemies } from './enemy.js';
export function showCollectInfo(elementId, show, text, x, y) {
    let infoBox = document.getElementById(elementId);
    if (show) {
        infoBox.textContent = text;
        infoBox.style.display = 'block';
        infoBox.style.left = `${x}px`;
        infoBox.style.top = `${y}px`;
    }
    else {
        infoBox.style.display = 'none';
    }
}
export function isCollidingWithObstacle(interactiveObstacles, newX, newY, collidingType) {
    return interactiveObstacles.some((obstacle) => {
        if (obstacle.type === collidingType) {
            return false;
        }
        return (newX < obstacle.x + obstacle.width &&
            newX + this.width > obstacle.x &&
            newY < obstacle.y + obstacle.height &&
            newY + this.height > obstacle.y);
    });
}
export function checkCollectibleProximity(interactiveObstacles, player) {
    let nearestCollectible = null;
    let nearestDistance = Infinity;
    interactiveObstacles.forEach((obstacle) => {
        let distance = Math.sqrt(Math.pow((player.x + 15 - obstacle.x - obstacle.width / 2), 2) +
            Math.pow((player.y + 15 - obstacle.y - obstacle.height / 2), 2));
        if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestCollectible = obstacle;
        }
        if (distance < 50) {
            player.closestItem = nearestCollectible;
        }
    });
}
export const dragElement = (element, dragzone) => {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const dragMouseUp = () => {
        document.onmouseup = null;
        document.onmousemove = null;
        element.classList.remove('drag');
    };
    const dragMouseMove = (event) => {
        event.preventDefault();
        pos1 = pos3 - event.clientX;
        pos2 = pos4 - event.clientY;
        pos3 = event.clientX;
        pos4 = event.clientY;
        element.style.top = `${element.offsetTop - pos2}px`;
        element.style.left = `${element.offsetLeft - pos1}px`;
    };
    const dragMouseDown = (event) => {
        event.preventDefault();
        pos3 = event.clientX;
        pos4 = event.clientY;
        element.classList.add('drag');
        document.onmouseup = dragMouseUp;
        document.onmousemove = dragMouseMove;
    };
    dragzone.onmousedown = dragMouseDown;
};
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
export function destroyObstacle() {
    return __awaiter(this, void 0, void 0, function* () {
        let indexDoUsuniecia = this.interactiveObstacles.findIndex((obstacle) => obstacle.x == this.closestItem.x);
        if (indexDoUsuniecia != -1 && this.canDestroy == true) {
            this.canDestroy = false;
            yield delay(this.closestItem.digTime / this.strength);
            this.interactiveObstacles.splice(indexDoUsuniecia, 1);
            yield delay(1000);
            this.canDestroy = true;
        }
    });
}
export function updateHP(damge) {
    let hp = document.getElementById('hpWidth');
    hp.innerHTML = `${player.hp}%`;
    hp.style.width = `${player.hp * 1.5 - (damge / player.hp) * 100}px`;
    if (player.hp == 0) {
        hp.style.width = '0px';
    }
}
export function startNewGame() {
    return __awaiter(this, void 0, void 0, function* () {
        gameOverDiv.style.display = 'none';
        document.getElementById('night').style.transition = '4s';
        document.getElementById('night2').style.transition = '4s';
        document.getElementById('night').style.opacity = '0%';
        document.getElementById('night2').style.opacity = '0%';
        document.getElementById('night').style.zIndex = '-1';
        document.getElementById('night2').style.zIndex = '-1';
        player.isCollidingWithObstacle = isCollidingWithObstacle;
        player.interactiveObstacles = interactiveObstacles;
        player.showCollectInfo = showCollectInfo;
        player.collectItem = collectItem;
        player.updateInventory = updateInventory;
        player.setIsHoldingItem = setIsHoldingItem;
        player.setCursorItems = setCursorItems;
        player.getCursorItems = getCursorItems;
        player.x = player.canvas.width / 2;
        player.y = player.canvas.height / 2;
        player.mouseX = 0;
        player.mouseY = 0;
        player.width = 30;
        player.height = 30;
        player.speed = 2.2;
        player.isCollecting = false;
        player.isHoldingItem = false;
        player.canPlace = false;
        player.cursorImage = new Image();
        player.distance = Math.sqrt(Math.pow(player.mouseX - player.x - 15, 2) +
            Math.pow(player.mouseY - player.y - 15, 2));
        player.isCraftingOpen = false;
        player.day = 1;
        player.functionIsExecuted = false;
        player.hp = 100;
        player.getDamage = false;
        player.interactiveObstacles.splice(0, player.interactiveObstacles.length);
        enemies.splice(0, enemies.length);
        inventory.fill(null);
        updateHP(0);
        updateInventory();
        createObstacles(30);
        updateGame();
    });
}
