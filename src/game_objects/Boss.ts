import Enemy from "./Enemy"

class Boss extends Enemy {
    constructor(name, health, attack, coin_value) {
        super(name, health, attack, coin_value)
    }
}

export const dungeon_bosses: Record<string, Record<string, Boss>> = {
    'Goblin Dungeon': {
        // 'Goblin Lord': new Boss('Goblin Lord', 60, 12, 100),
        'Goblin Lord': new Boss('Goblin Lord', 600, 120, 100),
    },
    'Slime Dungeon': {
        'Slime Lord': new Boss('Slime Lord', 2000, 250, 1000)
    }
}

export default Boss