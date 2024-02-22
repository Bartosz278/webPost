
export interface Block {
    name: string;
    diggingTime: number;
    interactive: boolean;
    image: HTMLImageElement;
    spawnChance: number;
    canPlace: boolean;
  }
  
  export const blocks: Block[] = [
    { name: 'tree', diggingTime: 1000, interactive: true , image: new Image(), spawnChance:50,canPlace:false},
    { name: 'stone', diggingTime: 2000, interactive: true, image: new Image(), spawnChance:30,canPlace:false },
    { name: 'wall', diggingTime: 500, interactive: false, image: new Image(), spawnChance:20 ,canPlace:true}
  ];
  