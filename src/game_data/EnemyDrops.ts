import Item from "../game_objects/Item"
import Weapon from "../game_objects/Weapon"
import Armor from "../game_objects/Armor"


export const enemy_drops: Record<string, Item[]> = {
    "goblin": [
        new Item('Gold Coin', 'Material', 1, 'A rare goblin coin', 'Common', [.5, .6, .75, .8, .9]),
        new Item('Goblin Ear', 'Material', 1, 'A rare goblin ear', 'Rare', [.01,.015,.02,.02,.02]),
        new Weapon('Goblin Sword', 'I reckon', 200, 'Uncommon', [.0075,.015,.2,.25,.4])
    ],
    "skeleton": [
        new Armor('Bone Chestplate', 'Chestplate', 'A very bony chest', 200, 40, 'Rare', [.005,.0075,.0125,.02,.05])
    ],
    "Goblin Lord": [
        new Item('Lord Coin', 'Material', 1, 'A goblin coin from the almighty goblin lord','Uncommon', [.5, .6, .75, .8, .9])
    ],
    "slime": [],
    "Slime Lord": []
}


