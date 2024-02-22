import { interactiveObstacles } from "./objects.js";
import { inventoryEl } from "./game.js";
import { player } from "./game.js";

export interface Item {
    name: string;
    x: number;
    y: number;
    size: number;
    digTime: number;
    interactive: boolean;
    count: number;
    canPlace: boolean;
  }
  
export const inventory: Item[] = Array(10).fill(null);

export function collectItem(index: number): void {
  const item: Item = {...interactiveObstacles.splice(index, 1)[0]};
  let added: boolean = false;
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i] && inventory[i].name== item.name) {
      inventory[i].count++;
      added = true;
      break;
    } else if (!inventory[i]) {
      inventory[i] = { ...item, count: 1 };
      added = true;
      break;
    }
  }
  if (!added) {
    alert("Ekwipunek pełny!");
  }
  updateInventory();
}

export function updateInventory(): void {
  inventoryEl.innerHTML = "";
  inventory.forEach(function (item: Item, index: number) {
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.id = `${index}`;
    slot.addEventListener('click',()=>{
      useItem(item,slot,inventory);
    });
    if (item) {
      const itemCount = document.createElement("span");
      itemCount.className = "itemCount";
      itemCount.id = `${index}`
      itemCount.textContent = item.count.toString();
      slot.appendChild(itemCount);
      slot.style.backgroundImage = `url("assets/eqIcons/${item.name}Eq.png")`;
    }
    inventoryEl.appendChild(slot);
  });
}
export let cursorItems:Item;
export function setCursorItems(items:Item){
  cursorItems=items;
}
export function getCursorItems(){
  return cursorItems;
}
export let isHoldingItem:boolean = false;
export function setIsHoldingItem(value: boolean) {
  isHoldingItem = value;
}
export function getIsHoldingItem(){
  return isHoldingItem
}

export function useItem(item:Item,slot:HTMLElement,inventory:any): boolean{  
  if(getIsHoldingItem() == false && inventory[slot.id] != null ){
    setCursorItems(inventory[slot.id]);
    document.getElementById(`${slot.id}`).textContent = '';
    slot.style.backgroundImage = null;
    inventory[slot.id]=null;
    setIsHoldingItem(true);
    player.canPlace = cursorItems.canPlace;
    updateInventory();
    return true;
  }
  if(getIsHoldingItem() == true && inventory[slot.id]==null && cursorItems.count>0){
    document.getElementById(`${slot.id}`).textContent = cursorItems.count.toString();
    slot.style.backgroundImage = `url("assets/eqIcons/${cursorItems.name}Eq.png")`;
    inventory[slot.id]=getCursorItems();
    setIsHoldingItem(false);
    updateInventory();
    return false;
  }
  if(getIsHoldingItem() == true && inventory[slot.id]!=null && inventory[slot.id].name == cursorItems.name && cursorItems.count>0){
    inventory[slot.id].count = inventory[slot.id].count + getCursorItems().count;
    setIsHoldingItem(false);
    updateInventory();
    return false;
  }
  if(getIsHoldingItem() == true && inventory[slot.id]!=null && inventory[slot.id].name != cursorItems.name && cursorItems.count>0){
    let temp: Item = getCursorItems();
    setCursorItems(inventory[slot.id]);
    document.getElementById(`${slot.id}`).textContent = '';
    slot.style.backgroundImage = null;
    inventory[slot.id]=null;
    document.getElementById(`${slot.id}`).textContent = temp.count.toString();
    slot.style.backgroundImage = `url("assets/eqIcons/${temp.name}Eq.png")`;
    inventory[slot.id]=temp;
    setIsHoldingItem(true);
    updateInventory();
    return true;
  }

}

