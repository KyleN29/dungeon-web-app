import Item from "../game_objects/Item"
export type Drop = {
    item: Item
    rate: number
}

type DropTable = Drop[]

export const enemy_drops: Record<string, DropTable> = {
    goblin: [
        {item: new Item('Gold Coin', 'Material', 1, 'A rare goblin coin', .5), rate: .5},
        {item: new Item('Goblin Ear', 'Material', 1, 'A rare goblin ear', .01), rate: .01},
    ]
}

export const dungeon_enemies: Record<string, string[]> = {
    'Goblin Dungeon': [
        'goblin'
    ]
}
