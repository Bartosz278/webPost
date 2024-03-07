import { interactiveObstacles } from './objects.js';
import { inventoryEl } from './game.js';
import { player } from './game.js';
export const inventory = Array(10).fill(null);
export function collectItem(index) {
    const item = Object.assign({}, interactiveObstacles.splice(index, 1)[0]);
    let added = false;
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i] && inventory[i].name === item.name) {
            inventory[i].count += 1;
            added = true;
            break;
        }
    }
    if (!added) {
        for (let i = 0; i < inventory.length; i++) {
            if (!inventory[i]) {
                inventory[i] = Object.assign(Object.assign({}, item), { count: 1 });
                added = true;
                break;
            }
        }
    }
    if (!added) {
        alert('Ekwipunek pełny!');
    }
    updateInventory();
}
export function updateInventory() {
    inventoryEl.innerHTML = '';
    inventory.forEach(function (item, index) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.id = `${index}`;
        slot.addEventListener('click', () => {
            useItem(item, slot, inventory);
        });
        if (item) {
            const itemCount = document.createElement('span');
            itemCount.className = 'itemCount';
            itemCount.id = `${index}`;
            itemCount.textContent = item.count.toString();
            slot.appendChild(itemCount);
            slot.style.backgroundImage = `url("assets/eqIcons/${item.name}Eq.webp")`;
        }
        inventoryEl.appendChild(slot);
    });
}
export let cursorItems;
export function setCursorItems(items) {
    cursorItems = items;
}
export function getCursorItems() {
    return cursorItems;
}
export let isHoldingItem = false;
export function setIsHoldingItem(value) {
    isHoldingItem = value;
}
export function getIsHoldingItem() {
    return isHoldingItem;
}
export function useItem(item, slot, inventory) {
    if (getIsHoldingItem() == false && inventory[slot.id] != null) {
        setCursorItems(inventory[slot.id]);
        document.getElementById(`${slot.id}`).textContent = '';
        slot.style.backgroundImage = null;
        inventory[slot.id] = null;
        setIsHoldingItem(true);
        player.canPlace = cursorItems.canPlace;
        updateInventory();
        return true;
    }
    if (getIsHoldingItem() == true &&
        inventory[slot.id] == null &&
        cursorItems.count > 0) {
        document.getElementById(`${slot.id}`).textContent =
            cursorItems.count.toString();
        slot.style.backgroundImage = `url("assets/eqIcons/${cursorItems.name}Eq.webp")`;
        inventory[slot.id] = getCursorItems();
        setIsHoldingItem(false);
        updateInventory();
        return false;
    }
    if (getIsHoldingItem() == true &&
        inventory[slot.id] != null &&
        inventory[slot.id].name == cursorItems.name &&
        cursorItems.count > 0) {
        inventory[slot.id].count =
            inventory[slot.id].count + getCursorItems().count;
        setIsHoldingItem(false);
        updateInventory();
        return false;
    }
    if (getIsHoldingItem() == true &&
        inventory[slot.id] != null &&
        inventory[slot.id].name != cursorItems.name &&
        cursorItems.count > 0) {
        let temp = getCursorItems();
        setCursorItems(inventory[slot.id]);
        document.getElementById(`${slot.id}`).textContent = '';
        slot.style.backgroundImage = null;
        inventory[slot.id] = null;
        document.getElementById(`${slot.id}`).textContent = temp.count.toString();
        slot.style.backgroundImage = `url("assets/eqIcons/${temp.name}Eq.webp")`;
        inventory[slot.id] = temp;
        setIsHoldingItem(true);
        updateInventory();
        return true;
    }
}
