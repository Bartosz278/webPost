export interface Block {
  name: string;
  height: number;
  width: number;
  digTime: number;
  interactive: boolean;
  image: HTMLImageElement;
  spawnChance: number;
  canPlace: boolean;
  canCollect: boolean;
  method?: () => void;
  type: string;
}

export const blocks: Block[] = [
  {
    name: 'tree',
    height: 40,
    width: 40,
    digTime: 1000,
    interactive: false,
    image: new Image(),
    spawnChance: 50,
    canPlace: false,
    canCollect: true,
    type: 'block'
  },
  {
    name: 'stone',
    height: 40,
    width: 40,
    digTime: 2000,
    interactive: false,
    image: new Image(),
    spawnChance: 30,
    canPlace: false,
    canCollect: true,
    type: 'block'
  },
  {
    name: 'wall',
    height: 48,
    width: 33,
    digTime: 500,
    interactive: false,
    image: new Image(),
    spawnChance: 20,
    canPlace: true,
    canCollect: true,
    type: 'block'
  }
];
