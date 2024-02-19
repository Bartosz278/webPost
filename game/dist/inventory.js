import { interactiveObstacles } from "./objects.js";
import { inventoryEl } from "./game.js";
export const inventory = Array(10).fill(null);
export function collectItem(index) {
    const item = Object.assign({}, interactiveObstacles.splice(index, 1)[0]);
    let added = false;
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i] && inventory[i].name == item.name) {
            inventory[i].count++;
            added = true;
            break;
        }
        else if (!inventory[i]) {
            inventory[i] = Object.assign(Object.assign({}, item), { count: 1 });
            added = true;
            break;
        }
    }
    if (!added) {
        alert("Ekwipunek pełny!");
    }
    updateInventory();
}
export function updateInventory() {
    inventoryEl.innerHTML = "";
    inventory.forEach(function (item, index) {
        const slot = document.createElement("div");
        slot.className = "slot";
        if (item) {
            const itemCount = document.createElement("span");
            itemCount.className = "itemCount";
            itemCount.textContent = item.count.toString();
            slot.appendChild(itemCount);
            slot.style.backgroundImage = `url("assets/eqIcons/${item.name}Eq.png")`;
        }
        inventoryEl.appendChild(slot);
    });
}
