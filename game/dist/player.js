export class Player {
    constructor(ctx, img, canvas, isCollidingWithObstacle, interactiveObstacles, showCollectInfo, collectItem, updateInventory, cursorItems) {
        this.ctx = ctx;
        this.img = img;
        this.canvas = canvas;
        this.isCollidingWithObstacle = isCollidingWithObstacle;
        this.interactiveObstacles = interactiveObstacles;
        this.showCollectInfo = showCollectInfo;
        this.collectItem = collectItem;
        this.updateInventory = updateInventory;
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
        this.distance = Math.sqrt(Math.pow(this.mouseX - this.x - 15, 2) + Math.pow(this.mouseY - this.y - 15, 2));
    }
    drawPlayer() {
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    drawHeldItem() {
        this.cursorImage.src = `assets/eqIcons/wallEq.png`;
        if (this.isHoldingItem == true && this.canPlace == true) {
            this.ctx.drawImage(this.cursorImage, this.mouseX, this.mouseY);
        }
    }
    drawBuildRange() {
        if (this.isHoldingItem == true && this.canPlace == true) {
            this.ctx.beginPath();
            this.ctx.arc(this.x + 15, this.y + 15, 100, 0, 2 * Math.PI);
            this.ctx.stroke();
        }
    }
    build(cursorItems) {
        if (this.isHoldingItem == true && this.canPlace == true) {
            let distance = Math.sqrt(Math.pow(this.mouseX - this.x - 15, 2) + Math.pow(this.mouseY - this.y - 15, 2));
            this.cursorItems = cursorItems;
            this.cursorImage.src = `assets/eqIcons/${this.cursorItems.name}Eq.png`;
            if (distance <= 100 && this.cursorItems.count > 0) {
                this.cursorItems.count--;
                const obstacle = {
                    name: this.cursorItems.name,
                    x: this.mouseX - 15,
                    y: this.mouseY - 15,
                    size: 40,
                    digTime: this.cursorItems.digTime,
                    interactive: this.cursorItems.interactive,
                    count: 0,
                    image: new Image(),
                    canPlace: this.cursorItems.canPlace,
                };
                obstacle.image.src = `assets/${this.cursorItems.name}.png`;
                this.interactiveObstacles.push(obstacle);
            }
            if (this.cursorItems.count == 0) {
                this.isHoldingItem = false;
                this.cursorItems = null;
            }
            this.updateInventory();
        }
        if (this.isHoldingItem == true && this.distance > 100) {
            this.showCollectInfo("infoBox", true, "Cannot place here", this.mouseX, this.mouseY);
            setTimeout(() => { this.showCollectInfo("infoBox", false, "", 1, 2); }, 1000);
        }
    }
    move(keysPressed) {
        let newX = this.x;
        let newY = this.y;
        if (keysPressed["w"]) {
            newY -= this.speed;
        }
        if (keysPressed["s"]) {
            newY += this.speed;
        }
        if (keysPressed["a"]) {
            newX -= this.speed;
        }
        if (keysPressed["d"]) {
            newX += this.speed;
        }
        if (keysPressed['g']) {
            this.drawBuildRange();
            console.log(this.mouseX);
            console.log(this.mouseY);
            console.log(this.interactiveObstacles);
        }
        if (!this.isCollidingWithObstacle(this.interactiveObstacles, newX, newY)) {
            this.x = newX;
            this.y = newY;
        }
        if (keysPressed[' '] && !this.isCollecting) {
            this.tryCollecting();
        }
    }
    tryCollecting() {
        for (let i = this.interactiveObstacles.length - 1; i >= 0; i--) {
            let obstacle = this.interactiveObstacles[i];
            let distance = Math.sqrt(Math.pow(this.x - obstacle.x, 2) + Math.pow(this.y - obstacle.y, 2));
            if (distance < 50) {
                this.isCollecting = true;
                this.showCollectInfo("infoBox", true, "Collecting...", this.x + 20, this.y - 20);
                setTimeout(() => {
                    this.collectItem(i);
                    this.isCollecting = false;
                    this.showCollectInfo("infoBox", false, "x", this.x + 20, this.y - 20);
                }, obstacle.digTime);
                break;
            }
        }
    }
}
