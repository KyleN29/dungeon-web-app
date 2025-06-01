import Enemy from "./Enemy"

class Boss extends Enemy {
    constructor(name, health, attack, coin_value) {
        super(name, health, attack, coin_value)
    }
}

export default Boss