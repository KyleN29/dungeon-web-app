import {enemy_drops, Drop} from '~/game_data/EnemyDrops'
import Item from './Item'
import Weapon from './Weapon'
import Armor from './Armor'


class Enemy {
    name: string
    base_health: number
    health: number
    base_attack: number
    attack: number
    coin_value: number

    constructor(name, base_health, base_attack, coin_value) {
        this.name = name
        this.base_health = base_health
        this.base_attack = base_attack
        this.coin_value = coin_value

        this.health = this.base_health
        this.attack = this.base_attack
    }

    drop_items(current_mastery: number) {
        let drops = enemy_drops[this.name]
        let dropped_items: Item[] = []
        for (let i = 0; i < drops.length; i++) {
            if (Math.random() < drops[i].rates[current_mastery-1]) {
                if (drops[i] instanceof Weapon) {
                    let weapon = drops[i]
                    dropped_items.push(new Weapon(weapon.name, weapon.description, weapon.attack, weapon.rates))
                }
                else if (drops[i] instanceof Armor) {
                    let armor = drops[i]
                    dropped_items.push(new Armor(armor.name, armor.type, armor.description, armor.health, armor.defense, armor.rates))
                }
                else {
                    let item = drops[i]
                    dropped_items.push(new Item(item.name, item.type, item.quantity, item.description, item.rates))
                }
                
            }
        }
        return dropped_items
    }

    compute_attack(mastery, level) {
        let attack = this.base_attack + (this.base_attack * (level-1) * .05) // Additive buffs
        // attack = attack * Math.max(1, ((mastery-1) * 10)) // Multiplicative buffs
        attack = attack * ((2 ** mastery)-1) // Multiplicative buffs
        attack = (attack ** (Math.max(1, (1+(mastery-1)/10)))) // Exponential buff
        return Math.floor(attack)
    }
    compute_health(mastery, level) {
        let health = this.base_health + (this.base_health * (level-1) * .05) // Additive buffs
        // health = health * Math.max(1, ((mastery-1) * 10)) // Multiplicative buffs
        health = health * ((2 ** mastery)-1)
        health = (health ** (Math.max(1, (1+(mastery-1)/10))))// Exponential buff
        
        return Math.floor(health)
    }
}

export const dungeon_enemies: Record<string, Record<string, Enemy>> = {
    'Goblin Dungeon': {
        // 'goblin': new Enemy('goblin', 25, 5, 100),
        // 'skeleton': new Enemy('skeleton', 30, 6, 100)
        'goblin': new Enemy('goblin', 250, 25, 100),
        'skeleton': new Enemy('skeleton', 300, 60, 100)
    },
    'Slime Dungeon': {
        'slime': new Enemy('slime', 1000, 50, 1000),
    }
}

export default Enemy