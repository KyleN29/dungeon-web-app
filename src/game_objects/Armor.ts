import Item from "./Item";

class Armor extends Item {
    health: number
    defense: number
    constructor(name, type, description, health, defense, rates) {
        super(name, type, 1, description, rates)
        this.health = health
        this.defense = defense
    }
}

export default Armor