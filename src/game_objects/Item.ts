class Item {
    id: string
    name: string
    type: string
    quantity: number
    description: string
    rarity: string
    rates: number[]
    constructor(name, type, quantity, description, rarity, rates, id=crypto.randomUUID()) {
        this.id = id
        this.name = name
        this.type = type
        this.quantity = quantity
        this.description = description
        this.rarity = rarity
        this.rates = rates
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            quantity: this.quantity,
            description: this.description,
            rates: this.rates,
        }
    }

    static fromJSON(data) {
        return new Item(data.name, data.type, data.quantity, data.description, data.rates, data.id)
    }
}

export default Item