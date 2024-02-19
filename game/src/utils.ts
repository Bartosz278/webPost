import { Player } from "./player";

const interactiveObstacles: any[] = [];

export function showCollectInfo(
  elementId: string,
  show: boolean,
  text: string,
  x: number,
  y: number
): void {
  let infoBox = document.getElementById(elementId);
  if (show) {
    infoBox.textContent = text;
    infoBox.style.display = "block";
    infoBox.style.left = `${x}px`;
    infoBox.style.top = `${y}px`;
  } else {
    infoBox.style.display = "none";
  }
}

export function isCollidingWithObstacle(
  interactiveObstacles: any[],
  newX: number,
  newY: number
): boolean {
  return interactiveObstacles.some((obstacle) => {
    return (
      newX < obstacle.x + obstacle.size &&
      newX + this.width > obstacle.x &&
      newY < obstacle.y + obstacle.size &&
      newY + this.height > obstacle.y
    );
  });
}

export function checkCollectibleProximity(
  interactiveObstacles: any[],
  player: any
): void {
  let isNearCollectible = false;
  interactiveObstacles.forEach((obstacle) => {
    let distance = Math.sqrt(
      (player.x - obstacle.x) ** 2 + (player.y - obstacle.y) ** 2
    );
    if (distance < 50) {
      isNearCollectible = true;
    }
  });
  if (!isNearCollectible) {
  }
}

