export interface CraftableItem {
  name: string;
  height: number;
  width: number;
  diggingTime: number;
  interactive: boolean;
  image: HTMLImageElement;
  canPlace: boolean;
  requiredItems: { name: string; count: number }[];
}

export const craftableItems: CraftableItem[] = [
  {
    name: 'wall',
    height: 48,
    width: 33,
    diggingTime: 1000,
    interactive: false,
    image: new Image(),
    canPlace: true,
    requiredItems: [{ name: 'stone', count: 2 }]
  },
  {
    name: 'bed',
    height: 40,
    width: 80,
    diggingTime: 300,
    interactive: true,
    image: new Image(),
    canPlace: true,
    requiredItems: [{ name: 'tree', count: 4 }]
  },
  {
    name: 'pickaxe',
    height: 40,
    width: 20,
    diggingTime: 0,
    interactive: true,
    image: new Image(),
    canPlace: true,
    requiredItems: [
      { name: 'tree', count: 4 },
      { name: 'stone', count: 3 }
    ]
  }
];
