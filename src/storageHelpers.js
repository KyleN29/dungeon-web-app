import useStore from "./store"
import Item from "./game_objects/Item"
import Armor from "./game_objects/Armor"
import Weapon from "./game_objects/Weapon"
const UPGRADE_KEY = 'upgrade_levels'
const DUNGEON_STATS_KEY = 'dungeon_stats'
const INVENTORY_KEY = 'inventory'

export function saveUpgradeData() {
    const upgradeManager = useStore.getState().upgradeManager
    const data = upgradeManager.toJSON()
    localStorage.setItem(UPGRADE_KEY, JSON.stringify(data))
}

export function loadUpgradeData() {
    const raw = localStorage.getItem(UPGRADE_KEY)
    return raw ? JSON.parse(raw) : null
}

export function saveDungeonStats() {
    const dungeonStats = useStore.getState().dungeonStats
    localStorage.setItem(DUNGEON_STATS_KEY, JSON.stringify(dungeonStats))
}

export function loadDungeonStats() {
    const raw = localStorage.getItem(DUNGEON_STATS_KEY)
    return raw ? JSON.parse(raw) : null
}

export function saveInventory() {
    const { inventory } = useStore.getState()
    const serialized = inventory.map(item => item.toJSON())
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(serialized))
}

export function loadInventory() {
    const raw = localStorage.getItem(INVENTORY_KEY)
    if (!raw) return []

    const data = JSON.parse(raw)
    let x = data.map(obj => {
        switch (obj.type) {
            case "Item": return Item.fromJSON(obj)
            case "Weapon": return Weapon.fromJSON(obj)
            case "Armor": return Armor.fromJSON(obj)
            case "Material": return Item.fromJSON(obj)
            default: return null
        }
    }).filter(x => x !== null)
    return data.map(obj => {
        switch (obj.type) {
            case "Item": return Item.fromJSON(obj)
            case "Weapon": return Weapon.fromJSON(obj)
            case "Armor": return Armor.fromJSON(obj)
            case "Material": return Item.fromJSON(obj)
            default: return null
        }
    }).filter(x => x !== null)
}