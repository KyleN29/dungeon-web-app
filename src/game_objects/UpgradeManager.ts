import Upgrade from "./Upgrade"
import useStore from "../store"
class UpgradeManager {
    better_moves: Upgrade
    spawn_chests: Upgrade
    faster_moves: Upgrade
    constructor() {
        this.better_moves = new Upgrade('More Moves', 10, 10)
        this.faster_moves = new Upgrade('Faster Moves', 10, 9)
        this.spawn_chests = new Upgrade('Treasure Chests', 0, 5)
    }

    get_all_upgrades() {
        return [this.better_moves, this.faster_moves, this.spawn_chests]
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