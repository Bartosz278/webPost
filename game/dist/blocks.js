export const blocks = [
    {
        name: 'tree',
        height: 40,
        width: 40,
        diggingTime: 1000,
        interactive: true,
        image: new Image(),
        spawnChance: 50,
        canPlace: false
    },
    {
        name: 'stone',
        height: 40,
        width: 40,
        diggingTime: 2000,
        interactive: true,
        image: new Image(),
        spawnChance: 30,
        canPlace: false
    },
    {
        name: 'wall',
        height: 48,
        width: 33,
        diggingTime: 500,
        interactive: false,
        image: new Image(),
        spawnChance: 20,
        canPlace: true
    }
];
