import { Player } from './player.js';
import { craftableItems, CraftableItem } from './items-in-crafting.js';
import { inventory, updateInventory } from './inventory.js';
import { showCollectInfo } from './utils.js';
const craftingWindow: HTMLElement = document.getElementById('craftingWindow');
export function drawCraftingWindow(
  player: Player,
  craftingWindow: HTMLElement
) {
  if (player.isCraftingOpen == true) {
    craftingWindow.style.display = 'flex';
  } else {
    craftingWindow.style.display = 'none';
  }
}
export function moveWindow(window: HTMLElement, player: Player) {
  window.style.bottom = `${player.mouseY}px`;
  console.log(player.mouseY);
  console.log(player.mouseX);
  window.style.left = `${player.mouseX}px`;
}
const iconsInCrafting = document.querySelectorAll('.itemInCrafting');

iconsInCrafting.forEach((item) => {
  item.addEventListener('click', () => {
    console.log('as');
  });
});

craftableItems.forEach((item) => {
  let itemElement = document.createElement('div');
  itemElement.className = 'itemInCrafting';
  itemElement.textContent = `${item.name}`;
  itemElement.addEventListener('click', () => craftItem(item));
  craftingWindow.appendChild(itemElement);
});

function addItemToInventory(craftableItem: CraftableItem) {
  let added = false;

  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i] && inventory[i].name === craftableItem.name) {
      inventory[i].count += 1;
      added = true;
      break;
    }
  }

  if (!added) {
    for (let i = 0; i < inventory.length; i++) {
      if (inventory[i] === null) {
        inventory[i] = {
          name: craftableItem.name,
          x: 0,
          y: 0,
          height: craftableItem.height,
          width: craftableItem.width,
          digTime: craftableItem.digTime,
          interactive: craftableItem.interactive,
          count: 1,
          canPlace: craftableItem.canPlace,
          method: craftableItem.method,
          type: craftableItem.type
        };
        added = true;
        break;
      }
    }
  }

  if (!added) {
    alert('Inventory is full!');
  }

  updateInventory();
}
function craftItem(craftableItem: CraftableItem) {
  const canCraft = craftableItem.requiredItems.every((requiredItem) => {
    const inventoryItem = inventory.find(
      (item) => item && item.name === requiredItem.name
    );
    return inventoryItem && inventoryItem.count >= requiredItem.count;
  });

  if (!canCraft) {
    showCollectInfo('infoBox', true, 'Not enough resources!', 30, 30);
    setTimeout(() => {
      showCollectInfo('infoBox', false, '', 30, 30);
    }, 1000);
    return;
  }

  craftableItem.requiredItems.forEach((requiredItem) => {
    const inventoryIndex = inventory.findIndex(
      (item) => item && item.name === requiredItem.name
    );
    if (inventoryIndex !== -1) {
      inventory[inventoryIndex].count -= requiredItem.count;
      if (inventory[inventoryIndex].count <= 0) {
        inventory[inventoryIndex] = null;
      }
    }
  });

  addItemToInventory(craftableItem);
}
