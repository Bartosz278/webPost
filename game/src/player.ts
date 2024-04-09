import { interactiveObstacles } from './objects.js';
//prettier-ignore
import {Item,cursorItems,inventory,isHoldingItem,useItem,setIsHoldingItem,getIsHoldingItem} from './inventory.js';
import { checkCollectibleProximity } from './utils.js';
import { craftableItems } from './items-in-crafting.js';
import { closestEnemies, player } from './game.js';
import { Enemy, enemies } from './enemy.js';
export interface Obstacle {
  name: string;
  x: number;
  y: number;
  height: number;
  width: number;
  digTime: number;
  interactive: boolean;
  count: number;
  image: HTMLImageElement;
  canPlace: boolean;
  canCollect: boolean;
  method?: () => void;
  type: string;
}

export class Player {
  ctx: CanvasRenderingContext2D;
  img: HTMLImageElement;
  canvas: HTMLCanvasElement;
  isCollidingWithObstacle: (
    obstacles: Obstacle[],
    x: number,
    y: number
  ) => boolean;
  interactiveObstacles: Obstacle[];
  showCollectInfo: (
    id: string,
    show: boolean,
    text: string,
    x: number,
    y: number
  ) => void;
  collectItem: (index: number) => void;
  updateInventory: () => void;
  setIsHoldingItem: (value: boolean) => void;
  getIsHoldingItem: (value: boolean) => void;
  setCursorItems: (item: Item) => void;
  getCursorItems: () => Item;
  x: number;
  y: number;
  mouseX: number;
  mouseY: number;
  width: number;
  height: number;
  speed: number;
  isCollecting: boolean;
  isHoldingItem: boolean;
  canPlace: boolean;
  cursorItems: Item;
  cursorImage: HTMLImageElement;
  distance: number;
  isCraftingOpen: boolean;
  closestItem: any;
  day: number;
  functionIsExecuted: boolean;
  hp: number;
  getDamage: boolean;
  closestEnemies: Enemy[];
  canAttack: boolean;

  constructor(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    canvas: HTMLCanvasElement,
    isCollidingWithObstacle: (
      obstacles: Obstacle[],
      x: number,
      y: number
    ) => boolean,
    interactiveObstacles: Obstacle[],
    showCollectInfo: (
      id: string,
      show: boolean,
      text: string,
      x: number,
      y: number
    ) => void,
    collectItem: (index: number) => void,
    updateInventory: () => void,
    setIsHoldingItem: (value: boolean) => void,
    getIsHoldingItem: (value: boolean) => void,
    setCursorItems: (item: Item) => void,
    getCursorItems: () => Item,
    cursorItems: Item
  ) {
    this.ctx = ctx;
    this.img = img;
    this.canvas = canvas;
    this.isCollidingWithObstacle = isCollidingWithObstacle;
    this.interactiveObstacles = interactiveObstacles;
    this.showCollectInfo = showCollectInfo;
    this.collectItem = collectItem;
    this.updateInventory = updateInventory;
    this.setIsHoldingItem = setIsHoldingItem;
    this.setCursorItems = setCursorItems;
    this.getCursorItems = getCursorItems;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.mouseX = 0;
    this.mouseY = 0;
    this.width = 30;
    this.height = 30;
    this.speed = 2.2;
    this.isCollecting = false;
    this.isHoldingItem = false;
    this.canPlace = false;
    this.cursorImage = new Image();
    this.distance = Math.sqrt(
      Math.pow(this.mouseX - this.x - 15, 2) +
        Math.pow(this.mouseY - this.y - 15, 2)
    );
    this.isCraftingOpen = false;
    this.day = 1;
    this.functionIsExecuted = false;
    this.hp = 100;
    this.getDamage = false;
    this.canAttack = true;
  }

  drawPlayer(): void {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  drawHeldItem(ctx: CanvasRenderingContext2D, cursorItems: Item): void {
    this.cursorImage.src = `assets/eqIcons/${cursorItems.name}Eq.webp`;
    if (this.isHoldingItem == true && this.canPlace == true) {
      ctx.drawImage(
        this.cursorImage,
        this.mouseX - this.cursorItems.width / 2,
        this.mouseY - this.cursorItems.height / 2
      );
    }
  }
  drawBuildRange(): void {
    if (this.isHoldingItem == true && this.getCursorItems().canPlace == true) {
      this.ctx.beginPath();
      this.ctx.arc(this.x + 15, this.y + 15, 100, 0, 2 * Math.PI);
      this.ctx.stroke();
      this.drawHeldItem(this.ctx, this.cursorItems);
    }
  }

  build(cursorItems: Item): void {
    let distance = Math.sqrt(
      Math.pow(this.mouseX - this.x - 15, 2) +
        Math.pow(this.mouseY - this.y - 15, 2)
    );
    if (
      this.isHoldingItem == true &&
      cursorItems.canPlace == true &&
      cursorItems != null
    ) {
      this.cursorItems = this.getCursorItems();
      this.cursorImage.src = `assets/eqIcons/${this.cursorItems.name}Eq.webp`;
      if (distance <= 100 && this.getCursorItems().count > 0) {
        this.cursorItems.count--;
        const obstacle = {
          name: this.getCursorItems().name,
          x: this.mouseX - 15,
          y: this.mouseY - 15,
          height: this.cursorItems.height,
          width: this.cursorItems.width,
          digTime: this.getCursorItems().digTime,
          interactive: this.getCursorItems().interactive,
          count: 0,
          image: new Image(),
          canPlace: this.getCursorItems().canPlace,
          canCollect: this.getCursorItems().canCollect,
          method: this.getCursorItems().method,
          type: this.getCursorItems().type
        };
        obstacle.image.src = `assets/${this.cursorItems.name}.webp`;
        this.interactiveObstacles.push(obstacle);
      }
      if (cursorItems.count == 0) {
        this.isHoldingItem = false;
        this.setIsHoldingItem(false);
        this.cursorItems = null;
        cursorItems = null;
      }
      this.updateInventory();
    }
    if (this.isHoldingItem == true && distance > 100) {
      this.showCollectInfo(
        'infoBox',
        true,
        'Cannot place here',
        this.mouseX,
        this.mouseY
      );
      setTimeout(() => {
        this.showCollectInfo('infoBox', false, '', 1, 2);
      }, 1000);
    }
  }
  move(keysPressed: { [key: string]: boolean }): void {
    let newX = this.x;
    let newY = this.y;
    if (keysPressed['w']) {
      newY -= this.speed;
    }
    if (keysPressed['s']) {
      newY += this.speed;
    }
    if (keysPressed['a']) {
      newX -= this.speed;
    }
    if (keysPressed['d']) {
      newX += this.speed;
    }
    if (keysPressed['e'] && !this.functionIsExecuted) {
      if (this.closestItem.interactive == true) {
        this.closestItem.method();
        this.functionIsExecuted = true;
      }
    }
    if (keysPressed[' '] && this.canAttack) {
      this.attack();
    }
    if (keysPressed['g']) {
      console.log(closestEnemies);

      inventory[9] = {
        name: craftableItems[1].name,
        x: 0,
        y: 0,
        height: craftableItems[1].height,
        width: craftableItems[1].width,
        digTime: craftableItems[1].digTime,
        interactive: craftableItems[1].interactive,
        count: 1,
        canPlace: craftableItems[1].canPlace,
        canCollect: craftableItems[1].canCollect,
        method: craftableItems[1].method,
        type: craftableItems[1].type
      };
    }

    if (
      newY - this.speed <= 0 ||
      newY + this.speed >= this.canvas.height - 30 ||
      newX - this.speed <= 0 ||
      newX + this.speed >= this.canvas.width - 30
    ) {
      return;
    }
    if (!this.isCollidingWithObstacle(this.interactiveObstacles, newX, newY)) {
      this.x = newX;
      this.y = newY;
    }

    if (keysPressed['q'] && !this.isCollecting) {
      this.tryCollecting();
    }
  }

  tryCollecting(): void {
    for (let i = this.interactiveObstacles.length - 1; i >= 0; i--) {
      let obstacle = this.interactiveObstacles[i];
      let distance = Math.sqrt(
        Math.pow(this.x - obstacle.x, 2) + Math.pow(this.y - obstacle.y, 2)
      );
      if (distance < 50 && obstacle.canCollect == true) {
        this.isCollecting = true;
        this.showCollectInfo(
          'infoBox',
          true,
          'Collecting...',
          this.x + 20,
          this.y - 20
        );
        setTimeout(() => {
          this.collectItem(i);
          this.isCollecting = false;
          this.showCollectInfo('infoBox', false, 'x', this.x + 20, this.y - 20);
        }, obstacle.digTime);
        break;
      }
    }
  }
  getDamageMove(enemyX: number, enemyY: number) {
    let newCordX = player.x;
    let newCordY = player.y;
    if (player.getDamage) {
      if (enemyX > player.x + 15) {
        newCordX -= 8;
      }
      if (enemyX < player.x + 15) {
        newCordX += 8;
      }
      if (enemyY > player.x + 15) {
        newCordY -= 8;
      }
      if (enemyX < player.x + 15) {
        newCordY += 8;
      }
    }
    if (
      newCordY - this.speed <= 0 ||
      newCordY + this.speed >= this.canvas.height - 30 ||
      newCordX - this.speed <= 0 ||
      newCordX + this.speed >= this.canvas.width - 30
    ) {
      return;
    }
    if (
      !this.isCollidingWithObstacle(
        this.interactiveObstacles,
        newCordX,
        newCordY
      )
    ) {
      player.x = newCordX;
      player.y = newCordY;
    }
  }
  distanceToEnemies() {
    enemies.forEach((enemy) => {
      let distance = Math.sqrt(
        (this.x + 15 - enemy.x - enemy.width / 2) ** 2 +
          (this.y + 15 - enemy.y - enemy.height / 2) ** 2
      );
      if (
        distance < 75 &&
        !closestEnemies.some((enemyItem) => enemyItem === enemy)
      ) {
        closestEnemies.push(enemy);
      }
    });
    closestEnemies.forEach((enemy) => {
      let distance = Math.sqrt(
        (this.x + 15 - enemy.x - enemy.width / 2) ** 2 +
          (this.y + 15 - enemy.y - enemy.height / 2) ** 2
      );
      if (distance > 75) {
        let remove = closestEnemies.findIndex((enemy) => enemy.x === enemy.x);

        if (remove !== -1) {
          closestEnemies.splice(remove, 1);
        }
      }
    });
  }
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  attack() {
    this.canAttack = false;
    closestEnemies.forEach((enemy) => {
      enemy.health -= 10;
    });

    player.ctx.fillStyle = 'gray';
    player.ctx.fillRect(this.x + 30, this.y + 15, 75, 5);

    player.ctx.fillRect(this.x - 75, this.y + 15, 75, 5);
    player.ctx.stroke();

    player.ctx.fillStyle = 'gray';
    player.ctx.fillRect(this.x + 15, this.y - 75, 5, 75);

    player.ctx.fillRect(this.x + 15, this.y + 30, 5, 75);
    player.ctx.stroke();

    setTimeout(() => {
      this.canAttack = true;
    }, 1000);
  }
}
