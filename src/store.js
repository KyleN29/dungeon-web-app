import { create } from "zustand";
import Cell from "./game_objects/Cell";
import Dungeon from "./game_objects/Dungeon";
import Item from "./game_objects/Item"
import Weapon from "./game_objects/Weapon";
import UpgradeManager from "./game_objects/UpgradeManager"
import AlertManager from "./game_objects/AlertManager"
import { loadUpgradeData, loadDungeonStats, loadInventory } from './storageHelpers'

const useStore = create(function (set) {
    return {
        dungeon: new Dungeon(),
        dungeons: {
            "Goblin Dungeon": new Dungeon("Goblin Dungeon", 6),
            "Slime Dungeon": new Dungeon("Slime Dungeon", 7),
        },
        currentDungeonKey: "Goblin Dungeon",
        setCurrentDungeonKey: (name) => set((state) => ({currentDungeonKey: name})),
        getCurrentDungeon: function () {
            return this.dungeons[this.currentDungeonKey];
        },
        upgradeManager: new UpgradeManager(loadUpgradeData()),
        alertManager: new AlertManager(),
        tick: 0,
        coins: 0,
        addCoins: (amount) => set((state) => ({coins: state.coins + amount })),
        removeCoins: (amount) => set((state) => ({coins: state.coins- amount})),
        incrementTick: () => set((state) => ({ tick: state.tick + 1 })), // dummy update to trigger re-render
        dungeonStats: {
            "Goblin Dungeon": {
                max_mastery: 1,
                max_levels: { // mastery / max_level
                    1: 1,
                    2: 1,
                    3: 1,
                    4: 1,
                    5: 1,
                }
            },
            "Slime Dungeon": {
                max_mastery: 1,
                max_levels: {
                    1: 1,
                    2: 1,
                    3: 1,
                    4: 1,
                    5: 1,
                }
            },
        },
        setMaxMastery: (dungeon, mastery) => set((state) => (
            {
                dungeonStats: {
                    ...state.dungeonStats,
                    [dungeon]: {
                        ...state.dungeonStats[dungeon],
                        max_mastery: mastery
                    }
                }
            }
        )),
        setMaxLevels: (dungeon, maxLevels) => set((state) => (
            {
                dungeonStats: {
                    ...state.dungeonStats,
                    [dungeon]: {
                        ...state.dungeonStats[dungeon],
                        max_levels: maxLevels
                    }
                }
            }
        )),
        incrementTimesCompleted: (dungeon) => set((state) => (
            {
                dungeonStats: {
                    ...state.dungeonStats,
                    [dungeon]: {
                        ...state.dungeonStats[dungeon],
                        timesCompleted: state.dungeonStats[dungeon].timesCompleted + 1
                    }
                }
            }
        )),
        enemyHPMap: { "1-1": 2 },
        playerHP: 3,
        score: 0,
        gameOver: false,
        // inventory: loadInventory(),
        inventory: [],
        equippedWeapon: null,
        equipWeapon: (itemID) => set((state) => {
            for (let i = 0; i < state.inventory.length; i++) {
                if (itemID == state.inventory[i].id) {
                    return {equippedWeapon: state.inventory[i]}
                }
            }
        }),
        equippedArmor: {
            "Helmet": null,
            "Chestplate": null,
            "Leggings": null,
            "Boots": null,
        },
        equipArmor: (itemID) => set((state) => {
            let item = null
            for (let i = 0; i < state.inventory.length; i++) {
                if (itemID == state.inventory[i].id) {
                    item = state.inventory[i]
                }
            }
            if (!item) return
            return {
                equippedArmor: {
                    ...state.equippedArmor,
                    [item.type]: item
                }
            }
    }),
        addItem: (item) => set((state) => ({inventory: [...state.inventory, item]})),
        increaseItemQuantity: (itemName, quantity) => set((state) => {
            for (const item of state.inventory) {
                if (item.name === itemName) {
                    item.quantity += quantity
                }
            }
            return { inventory: [...state.inventory] } // triggers reactivity
        }),
        setDungeon: function (d) {
            set({ dungeon: d });
        },
    };
});

export default useStore;
