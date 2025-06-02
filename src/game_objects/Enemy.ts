import {enemy_drops, Drop} from '~/game_data/EnemyDrops'
import Item from './Item'
import Weapon from './Weapon'



class Enemy {
    name: string
    health: number
    attack: number
    coin_value: number

    constructor(name, health, attack, coin_value) {
        this.name = name
        this.health = health
        this.attack = attack
        this.coin_value = coin_value
    }

    drop_items(current_mastery: number) {
        let drops = enemy_drops[this.name]
        let dropped_items: Item[] = []
        for (let i = 0; i < drops.length; i++) {
            if (Math.random() < drops[i].rates[current_mastery-1]) {
                if (drops[i] instanceof Weapon) {
                    let weapon = drops[i]
                    dropped_items.push(new Weapon(weapon.name, weapon.description, weapon.attack, weapon.rates, crypto.randomUUID()))
                }
                else {
                    let item = drops[i]
                    dropped_items.push(new Item(item.name, item.type, item.quantity, item.description, item.rates, crypto.randomUUID()))
                }
                
            }
        }
        return dropped_items
    }
}

export const dungeon_enemies: Record<string, Record<string, Enemy>> = {
    'Goblin Dungeon': {
        'goblin': new Enemy('goblin', 50, 2, 100),
        'skeleton': new Enemy('skeleton', 50, 2, 100)
    }
}

export default Enemy