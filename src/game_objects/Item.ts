class Item {
    name: string
    type: string
    quantity: number
    description: string
    rate: number
    constructor(name, type, quantity, description, rate) {
        this.name = name
        this.type = type
        this.quantity = quantity
        this.description = description
        this.rate = rate
    }
}

export default Item