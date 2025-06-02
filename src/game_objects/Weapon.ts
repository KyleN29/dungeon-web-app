import Item from "./Item";

class Weapon extends Item {
    attack: number
    constructor(name, description, attack, rates, id) {
        super(name, 'Weapon', 1, description, rates, id)
        this.attack = attack
    }
}

export default Weapon