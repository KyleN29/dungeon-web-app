import { create } from "zustand";
import Cell from "./game_objects/Cell";
import Dungeon from "./game_objects/Dungeon";
import Item from "./game_objects/Item"
import Weapon from "./game_objects/Weapon";
import UpgradeManager from "./game_objects/UpgradeManager"
import AlertManager from "./game_objects/AlertManager"
const useStore = create(function (set) {
    return {
        dungeon: new Dungeon(),
        upgradeManager: new UpgradeManager(),
        alertManager: new AlertManager(),
        tick: 0,
        coins: 0,
        addCoins: (amount) => set((state) => ({coins: state.coins + amount })),
        removeCoins: (amount) => set((state) => ({coins: state.coins- amount})),
        incrementTick: () => set((state) => ({ tick: state.tick + 1 })), // dummy update to trigger re-render
        dungeonStats: {
            "Goblin Dungeon": {
                timesCompleted: 0
            }
        },
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
        inventory: [new Weapon('Iron Sword', 'HEYYY', 10000),
        ],
        equippedWeapon: null,
        equipWeapon: (itemName) => set((state) => {
            for (let i = 0; i < state.inventory.length; i++) {
                if (itemName == state.inventory[i].name) {
                    return {equippedWeapon: state.inventory[i]}
                }
            }
        }),
        addItem: (item) => set((state) => ({inventory: [...state.inventory, item]})),
        increaseItemQuantity: (itemName, quantity) => set((state) => {
            return {inventory: state.inventory.map(item =>
                item.name === itemName
                ? {...item, quantity: item.quantity + quantity}
                : item
            )}
        }),
        setDungeon: function (d) {
            set({ dungeon: d });
        },
    };
});

export default useStore;
