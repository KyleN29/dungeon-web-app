import Item from "./Item";

class Weapon extends Item {
    attack: number
    constructor(name, description, attack, rates, rarity, id=crypto.randomUUID()) {
        super(name, 'Weapon', 1, description, rates, rarity, id)
        this.attack = attack
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            quantity: this.quantity,
            description: this.description,
            rates: this.rates,
            attack: this.attack
        }
    }

    static fromJSON(data) {
        return new Weapon(data.name, data.description, data.attack, data.rates, data.id)
    }
}

export default Weapon