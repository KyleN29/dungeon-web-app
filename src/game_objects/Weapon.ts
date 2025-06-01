import Item from "./Item";

class Weapon extends Item {
    attack: number
    constructor(name, description, attack) {
        super(name, 'Weapon', 1, description)
        this.attack = attack
    }
}

export default Weapon