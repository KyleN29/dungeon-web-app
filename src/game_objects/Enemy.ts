import {enemy_drops, Drop} from '~/game_data/EnemyDrops'
import Item from './Item'
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

    drop_items() {
        let drops = enemy_drops[this.name]
        let dropped_items: Item[] = []
        for (let i = 0; i < drops.length; i++) {
            if (Math.random() < drops[i].rate) {
                dropped_items.push(drops[i].item)
            }
        }
        return dropped_items
    }
}

export default Enemy