import Upgrade from "./Upgrade"
import useStore from "../store"
class UpgradeManager {
    better_moves: Upgrade
    spawn_chests: Upgrade
    faster_moves: Upgrade
    more_attack: Upgrade
    more_health: Upgrade
    constructor() {
        this.better_moves = new Upgrade('More Moves', 10, 10)
        this.faster_moves = new Upgrade('Faster Moves', 10, 9)
        this.spawn_chests = new Upgrade('Treasure Chests', 0, 5)
        this.more_attack = new Upgrade('More Attack', 100, 20)
        this.more_health = new Upgrade('More Health', 50, 20)
    }

    get_all_upgrades() {
        return [this.better_moves, this.faster_moves, this.spawn_chests, this.more_attack, this.more_health]
    }

    buy_upgrade(upgrade: Upgrade) {
        
        let { coins, removeCoins, incrementTick } = useStore.getState()

        if (coins >= upgrade.cost && upgrade.level + 1 <= upgrade.maxLevel) {
            
            upgrade.level += 1
            removeCoins(upgrade.cost)
            incrementTick()
        }
    }
}

export default UpgradeManager