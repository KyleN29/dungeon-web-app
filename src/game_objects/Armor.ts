import Item from "./Item";

class Armor extends Item {
    health: number
    defense: number
    constructor(name, type, description, health, defense, rates, id=crypto.randomUUID()) {
        super(name, type, 1, description, rates, id)
        this.health = health
        this.defense = defense
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            quantity: this.quantity,
            description: this.description,
            rates: this.rates,
            defense: this.defense,
            health: this.health
        }
    }

    static fromJSON(data) {
        return new Armor(data.name, data.type, data.description, data.health, data.defense, data.rates, data.id)
    }
}

export default Armor