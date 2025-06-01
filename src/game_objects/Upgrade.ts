class Upgrade {
    name: string
    cost: number
    level: number
    maxLevel: number
    constructor(name, cost, maxLevel) {
        this.name = name
        this.cost = cost
        this.level = 0
        this.maxLevel = maxLevel
        
    }
}

export default Upgrade