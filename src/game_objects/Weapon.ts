import Item from "./Item";

class Weapon extends Item {
    attack: number
    constructor(name, description, attack, rates) {
        super(name, 'Weapon', 1, description, rates)
        this.attack = attack
    }
}

export default Weapon