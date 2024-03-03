import { player } from './game';
import { Player } from './player';

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
    infoBox.style.display = 'block';
    infoBox.style.left = `${x}px`;
    infoBox.style.top = `${y}px`;
  } else {
    infoBox.style.display = 'none';
  }
}

export function isCollidingWithObstacle(
  interactiveObstacles: any[],
  newX: number,
  newY: number
): boolean {
  return interactiveObstacles.some((obstacle) => {
    return (
      newX < obstacle.x + obstacle.width &&
      newX + this.width > obstacle.x &&
      newY < obstacle.y + obstacle.height &&
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

export const dragElement = (element, dragzone) => {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
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
