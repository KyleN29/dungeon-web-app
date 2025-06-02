import Item from "./Item"
import useStore from "../store"
class Player {
    health: number
    attack: number
    coins: number
    constructor() {
        this.health = 100
        this.attack = 100
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
        addItem(item)

    }

    get_attack() {
        const { equippedWeapon } = useStore.getState()
        let attack = this.attack
        if (equippedWeapon) attack += equippedWeapon.attack;
        return attack
    }
}

export default Player