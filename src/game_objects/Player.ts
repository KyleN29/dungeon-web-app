import Item from "./Item"
import useStore from "../store"
class Player {
    health: number
    max_health: number
    defense: number
    attack: number
    coins: number
    constructor() {
        this.health = 100
        this.max_health = 100
        this.attack = 10
        this.defense = 0
        this.coins = 0

    }

    add_item_to_inventory(item: Item) {
        const { inventory, addItem, increaseItemQuantity } = useStore.getState();
        for (let i = 0; i < inventory.length; i++) {
            if (item.name == inventory[i].name && item.type == 'Material') {
                increaseItemQuantity(item.name, item.quantity)
                return
            }
            
        }
        if (inventory.length > 80) return;
        addItem(item)

    }

    get_attack() {
        const { equippedWeapon, upgradeManager } = useStore.getState()
        let attack = this.attack
        if (equippedWeapon) attack += equippedWeapon.attack;
        return Math.floor(attack + (attack * upgradeManager.more_attack.level  * .1))
    }

    get_max_health() {
        const {equippedArmor, upgradeManager} = useStore.getState()
        let max_health = this.max_health
        for (const armorType in equippedArmor) {
            if (equippedArmor[armorType]) {
                max_health += equippedArmor.health
            }
        }
        return Math.floor(max_health + (max_health * upgradeManager.more_health.level  * .1))
    }

    get_defense() {
        const {equippedArmor} = useStore.getState()
        let defense = this.defense
        for (const armorType in equippedArmor) {
            if (equippedArmor[armorType]) {
                defense += equippedArmor.defense
            }
        }
        return defense
    }
}

export default Player