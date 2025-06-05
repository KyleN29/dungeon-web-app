class Item {
    id: string
    name: string
    type: string
    quantity: number
    description: string
    rates: number[]
    constructor(name, type, quantity, description, rates) {
        this.id = crypto.randomUUID()
        this.name = name
        this.type = type
        this.quantity = quantity
        this.description = description
        this.rates = rates
    }
}

export default Item