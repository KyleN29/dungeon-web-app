import Chest from './Chest'
import Enemy from './Enemy'
import Player from './Player'

type CellOptions = {
    occupant?: Player | Chest | Enemy | null;
    is_accessible?: boolean;
}

class Cell {
    is_accessible: boolean;
    occupant: Player | Chest | Enemy | null;
    constructor({occupant = null, is_accessible = true}: CellOptions = {}) {
        this.occupant = occupant
        this.is_accessible = is_accessible
    }
}

export default Cell;