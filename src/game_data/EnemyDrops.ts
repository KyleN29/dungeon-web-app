import Item from "../game_objects/Item"
import Weapon from "../game_objects/Weapon"
import Enemy from "../game_objects/Enemy"
export type Drop = {
    item: Item
    rate: number
}

type DropTable = Drop[]

export const enemy_drops: Record<string, Item[]> = {
    goblin: [
        new Item('Gold Coin', 'Material', 1, 'A rare goblin coin', [.5, .6, .75, .8, .9], crypto.randomUUID()),
        new Item('Goblin Ear', 'Material', 1, 'A rare goblin ear', [.01,.015,.02,.02,.02], crypto.randomUUID()),
        new Weapon('Goblin Sword', 'I reckon', 200, [.01,.015,.2,.25,.4], crypto.randomUUID())
    ],
    skeleton: [
        new Item('Bone Chestplate', 'Chestplate', 1, 'A very bony chest', [.005,.0075,.0125,.02,.05], crypto.randomUUID())
    ]
}


