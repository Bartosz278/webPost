const interactiveObstacles = [];
export function showCollectInfo(elementId, show, text, x, y) {
    let infoBox = document.getElementById(elementId);
    if (show) {
        infoBox.textContent = text;
        infoBox.style.display = "block";
        infoBox.style.left = `${x}px`;
        infoBox.style.top = `${y}px`;
    }
    else {
        infoBox.style.display = "none";
    }
}
export function isCollidingWithObstacle(interactiveObstacles, newX, newY) {
    return interactiveObstacles.some((obstacle) => {
        return (newX < obstacle.x + obstacle.size &&
            newX + this.width > obstacle.x &&
            newY < obstacle.y + obstacle.size &&
            newY + this.height > obstacle.y);
    });
}
export function checkCollectibleProximity(interactiveObstacles, player) {
    let isNearCollectible = false;
    interactiveObstacles.forEach((obstacle) => {
        let distance = Math.sqrt(Math.pow((player.x - obstacle.x), 2) + Math.pow((player.y - obstacle.y), 2));
        if (distance < 50) {
            isNearCollectible = true;
        }
    });
    if (!isNearCollectible) {
    }
}
