import Cell from './Cell'
import Chest from './Chest'
import Enemy, { dungeon_enemies } from './Enemy'
import Boss, {dungeon_bosses} from './Boss'
import Player from './Player'
import useStore from '~/store';
import { enemy_drops} from '../game_data/EnemyDrops'
import alertManagerInstance from './AlertManagerInstance'
import { triggerFlash } from './flashController';
type OutputType = 'kill' | 'drop' | 'start';

interface OutputEntry {
  text: string;
  type: OutputType;
}

class Dungeon {
    grid: Cell[][]
    accessible_cells: number[][]
    player_move_sequence: number[][]
    grid_size: number
    player_pos: number[]
    moves: number
    following_path: boolean
    output_text: OutputEntry[]
    dungeon_active: boolean
    dungeon_id: number
    dungeons: string[]
    current_dungeon: string
    current_mastery: number
    max_mastery: number
    current_level: number
    max_levels: { [key: number]: number } // Mastery: max_level for that mastery
    auto_change_level: boolean
    dungeon_name: string
    constructor(dungeon_name: string, grid_size: number) {
        this.dungeon_id = 0;
        this.grid = []
        this.accessible_cells = []
        // Track cells that have been visited so the pathfinding doesnt move to same cells repeatedly
        this.player_move_sequence = []
        this.grid_size = grid_size
        this.moves = 30;
        this.following_path = false
        
        this.dungeon_active = false
        
        this.output_text = []
        this.dungeon_name = dungeon_name

        this.current_mastery = 1
        this.max_mastery = 1
        this.current_level = 1
        this.max_levels = {
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1,
        }
        this.auto_change_level = true

    }

    start_dungeon() {
        if (this.dungeon_active) return
        let x = useStore.getState().dungeonStats
        this.max_mastery = useStore.getState().dungeonStats[this.dungeon_name]["max_mastery"]
        this.max_levels = useStore.getState().dungeonStats[this.dungeon_name]["max_levels"]
        this.grid_size = 6 + Math.floor(this.current_mastery-1)
        this.dungeon_id++;
        this.dungeon_active = true
        const { incrementTick } = useStore.getState()
        for (let x = 0; x < this.grid_size; x++) {
            this.grid[x] = [];
            for (let y = 0; y < this.grid_size; y++) {
                this.grid[x][y] = new Cell({occupant: null, is_accessible: false});
            }
        }
        let starting_pos = this.generate_grid(Math.floor((this.grid_size * this.grid_size) * .33))
        this.player_pos = starting_pos
        let player = new Player()
        player.health = player.get_max_health()
        this.grid[starting_pos[0]][starting_pos[1]] = new Cell({occupant: player, is_accessible: true})
        this.populate_boss()
        this.populate_enemies(Math.floor((this.grid_size * this.grid_size) * .1))
        this.populate_chests()
        
        
        
        const state = useStore.getState();
        this.moves = 30 + state.upgradeManager.better_moves.level;
        incrementTick()
        
        this.move_player_nearest_entity()
        this.add_to_output('Starting new dungeon.', 'start')
    }

    // get_level() {
    //     const { dungeonStats } = useStore.getState()
    //     const times_completed = dungeonStats[this.current_dungeon]["timesCompleted"]
    //     const level = Math.floor(times_completed / 10)
    //     return level+1
    // }

    get_dungeon_enemy_info(includeBosses: boolean = false) {
        let enemies = dungeon_enemies[this.dungeon_name]
        let bosses = dungeon_bosses[this.dungeon_name]
        let enemy_info = {}
        for (const name of Object.keys(enemies)) {
            enemy_info[name] = {drops: enemy_drops[name], health: enemies[name].compute_health(this.current_mastery, this.current_level), attack: enemies[name].compute_attack(this.current_mastery, this.current_level),  isBoss: false}
        }
        if (includeBosses) {
            for (const name of Object.keys(bosses)) {
                enemy_info[name] = {drops: enemy_drops[name], health: bosses[name].compute_health(this.current_mastery, this.current_level), attack: bosses[name].compute_attack(this.current_mastery, this.current_level), isBoss: false}
            }
        }
        

        return enemy_info
    }




    get_player() {
        if (this.player_pos) return this.grid[this.player_pos[0]][this.player_pos[1]].occupant
        
    }


    get_random_direction(cur_pos: number[], visited_grid: boolean[][]) {
        let valid_directions: number[][] = []

        // Get valid directions
        if (cur_pos[0] > 0 && visited_grid[cur_pos[0]-1][cur_pos[1]] == false) {
            valid_directions.push([-1, 0])
        }
        if (cur_pos[0] < this.grid_size - 1 &&  visited_grid[cur_pos[0]+1][cur_pos[1]] == false) {
            valid_directions.push([1, 0])
        }
        if (cur_pos[1] > 0 &&  visited_grid[cur_pos[0]][cur_pos[1]-1] == false) {
            valid_directions.push([0, -1])
        }
        if (cur_pos[1] < this.grid_size - 1 && visited_grid[cur_pos[0]][cur_pos[1]+1] == false) {
            valid_directions.push([0, 1])
        }
        if (valid_directions.length == 0) {
            return null
        }
        let random_index = Math.floor(Math.random() * valid_directions.length)
        let direction = valid_directions[random_index]

        return direction
    }

    

    shortestPath(grid, start, target) {
        const rows = grid.length;
        const cols = grid[0].length;
        const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
        const queue = [[...start, []]]; // [row, col, path]
    
        const directions = [
            [0, 1],  // right
            [1, 0],  // down
            [0, -1], // left
            [-1, 0]  // up
        ];
    
        while (queue.length) {
            const [row, col, path] = queue.shift() || [];
            if (row === undefined || col === undefined || !Array.isArray(path)) continue;

            // Out of bounds or inaccessible or visited
            if (row < 0 || col < 0 || row >= rows || col >= cols) continue;
            if (!grid[row][col].is_accessible || visited[row][col]) continue;
    
            visited[row][col] = true;
            const newPath = [...path, [row, col]];
    
            // Reached the target
            if (row === target[0] && col === target[1]) {
                return newPath;
            }
    
            // Add neighbors
            for (const [dx, dy] of directions) {
                queue.push([row + dx, col + dy, newPath]);
            }
        }
    
        return null; // No path found
    }

    populate_enemies(count: number) {
        let available_cells: number[][] = []
        for (let i = 0; i < this.accessible_cells.length; i++) {
            let cell = this.accessible_cells[i]
            if (this.grid[cell[0]][cell[1]].occupant == null) {
                available_cells.push(cell)
            }
        }
        for (let i = 0; i < count; i++) {
            if (!available_cells) return
            let random_index = Math.floor(Math.random() * available_cells.length)
            let random_cell = available_cells[random_index]

            available_cells.splice(random_index, 1)
            let enemies = this.get_dungeon_enemy_info()
            let enemy_names = Object.keys(enemies)
            random_index = Math.floor(Math.random() * enemy_names.length)

            let random_enemy = dungeon_enemies[this.dungeon_name][enemy_names[random_index]]
            let enemy = new Enemy(random_enemy.name, Math.floor(random_enemy.health*this.current_mastery*(1+this.current_level/100)), Math.floor(random_enemy.attack*this.current_mastery*(1+this.current_level/100)), random_enemy.coin_value)
            enemy.attack = enemy.compute_attack(this.current_mastery, this.current_level)
            enemy.health = enemy.compute_health(this.current_mastery, this.current_level)

            this.grid[random_cell[0]][random_cell[1]] = new Cell({occupant: enemy, is_accessible: true})
            // console.log("hey")

        }
    }

    populate_chests() {
        const {upgradeManager} = useStore.getState()
        for (let i = 0; i < this.accessible_cells.length; i++) {
            let cell = this.accessible_cells[i]
            if (this.grid[cell[0]][cell[1]].occupant == null && Math.random() < (.1 + upgradeManager.spawn_chests.level * .05)) {
                this.grid[cell[0]][cell[1]] = new Cell({occupant: new Chest(), is_accessible: true})
            }
        }
    }

    populate_boss() {
        let longest_path: any = []
        let longest_distance = 0
        for (let i = 0; i < this.accessible_cells.length; i++) {
            let cell = this.accessible_cells[i]
            if (!(this.grid[cell[0]][cell[1]].occupant instanceof Player)) {
                let path = this.shortestPath(this.grid, this.player_pos, cell)
                if (path && path.length > longest_distance) {
                    longest_path = path
                    longest_distance = path.length
                }
            }
        }
        
        if (!longest_path.length) return
        let furthest_cell = longest_path[longest_path.length - 1]
        let dungeon_boss_names = Object.keys(dungeon_bosses[this.dungeon_name])
        let random_index = Math.floor(Math.random() * dungeon_boss_names.length)
        let boss = dungeon_bosses[this.dungeon_name][dungeon_boss_names[random_index]]
        this.grid[furthest_cell[0]][furthest_cell[1]] = new Cell({occupant: new Boss(boss.name, boss.health, boss.attack, boss.coin_value), is_accessible: true})
    }

    generate_grid(cells: number) {
        let cur_pos = [Math.floor(Math.random() * this.grid_size), 0]
        let starting_pos = cur_pos
        let visited_grid: boolean[][] = []
        for (let x = 0; x < this.grid_size; x++) {
            visited_grid[x] = [];
            for (let y = 0; y < this.grid_size; y++) {
                visited_grid[x][y] = false
            }
        }
        visited_grid[cur_pos[0]][cur_pos[1]] = true
        this.grid[cur_pos[0]][cur_pos[1]] = new Cell({occupant: null, is_accessible: true})

        let cur_direction = this.get_random_direction(cur_pos, visited_grid)

        let position_sequence: number[][] = [[cur_pos[0],cur_pos[1]]]

        

        while (cells > 0) {
            let random_direction = this.get_random_direction(cur_pos, visited_grid)
            // Check if it is valid to move in same direction and if it is rolled
            if (cur_direction) {
                if (cur_pos[0] + cur_direction[0] >= 0 && cur_pos[0] + cur_direction[0] < this.grid_size && cur_pos[1] + cur_direction[1] >= 0 && cur_pos[1] + cur_direction[1] < this.grid_size) {
                    if (visited_grid[cur_pos[0]+cur_direction[0]][cur_pos[1]+cur_direction[1]] == false && Math.random() > .7) {
                        random_direction = cur_direction
                    }
                }
            }

            // Undo to last position if there are no valid moves
            let previous_direction = random_direction
            let previous_pos = cur_pos
            if (random_direction == null) {
                position_sequence.pop()
                cur_pos = position_sequence[position_sequence.length - 1]
                continue
            }

            // Roll again if near a lot of visited cells (try to move away from clumping)
            let cur_x = cur_pos[0] + random_direction[0]
            let cur_y = cur_pos[1] + random_direction[1]
            let nearby_visited_count = 0
            if (cur_x > 0 && visited_grid[cur_x-1][cur_y] == true) {
                nearby_visited_count++;
            }
            if (cur_x < this.grid_size - 1 && visited_grid[cur_x+1][cur_y] == true) {
                nearby_visited_count++;
            }
            if (cur_y > 0 && visited_grid[cur_x][cur_y-1] == true) {
                nearby_visited_count++;
            }
            if (cur_y < this.grid_size - 1 && visited_grid[cur_x][cur_y+1] == true) {
                nearby_visited_count++;
            }

            if (nearby_visited_count > 1) {
                random_direction = this.get_random_direction(cur_pos, visited_grid)
            }

            

            

            // Make move
            cur_pos = [cur_pos[0] + random_direction[0], cur_pos[1] + random_direction[1]]
            visited_grid[cur_pos[0]][cur_pos[1]] = true

            let random_cell: Cell = new Cell({occupant: null, is_accessible: true})
            this.grid[cur_pos[0]][cur_pos[1]] = random_cell
            position_sequence.push(cur_pos)
            cells--;
        }
        this.accessible_cells = position_sequence

        return starting_pos
    }

    get_random_accessible_cell() {
        let num_cells = this.accessible_cells.length
        let random_index = Math.floor(Math.random() * num_cells)
        return this.accessible_cells[random_index]
    }

    async follow_path(path) {
        if (this.following_path) {
            return
        }
        else {
            this.following_path = true
        }
        let dungeon_id = this.dungeon_id
        // Trigger Zustand update
        const { upgradeManager, incrementTick } = useStore.getState();
       
        for (let i = 1; i < path.length; i++) {
            const [row, col] = path[i]
            if (this.moves > 0 && i > 0) {
                await new Promise(resolve => setTimeout(resolve, 1000 - upgradeManager.faster_moves.level * 100))
            }
            
            if (dungeon_id !== this.dungeon_id || this.dungeon_name != useStore.getState().currentDungeonKey) {
                return; // abort this path, its for an old dungeon
            }
            if (this.moves > 0) {
                this.make_player_move(this.player_pos, [row, col])
                incrementTick(); // <-- This makes React re-render
                this.moves--;
                
            }
            else {
                this.following_path = false
                break
            }
        }
        if (this.moves > 0) {
            this.following_path = false
            if (dungeon_id !== this.dungeon_id || this.dungeon_name != useStore.getState().currentDungeonKey) {
                return; // abort this path, its for an old dungeon
            }
            let nearest_entity_path = this.get_nearest_entity_path()
            this.follow_path(nearest_entity_path)
        }
        else {
            this.following_path = false
            this.dungeon_active = false
            this.start_dungeon()
            
        }
    }

    stop_dungeon() {
        this.following_path = false
        this.dungeon_active = false
    }

    move_player_randomly() {
        let starting_pos = this.player_pos
        this.follow_path(this.shortestPath(this.grid, this.player_pos, this.get_random_accessible_cell()))
        
        
    }

    get_nearest_entity_path() {
        let shortest_path: any = []
        let shortest_distance = 99999
        for (let i = 0; i < this.accessible_cells.length; i++) {
            let cell = this.accessible_cells[i]
            if (this.grid[cell[0]][cell[1]].occupant !== null && !(this.grid[cell[0]][cell[1]].occupant instanceof Player)) {
                let path = this.shortestPath(this.grid, this.player_pos, cell)
                if (path && path.length < shortest_distance) {
                    shortest_path = path
                    shortest_distance = path.length
                }
            }
        }
        return shortest_path
    }

    move_player_nearest_entity() {
        let shortest_path = this.get_nearest_entity_path()
        if (shortest_path) {
            this.follow_path(shortest_path)
        }

    }

    try_increase_level() {
        if (this.current_level + 1 <= this.max_levels[this.current_mastery]) {
            this.current_level += 1
            this.reset_dungeon()
        }
    }

    try_decrease_level() {
        if (this.current_level - 1 > 0) {
            this.current_level -= 1
            this.reset_dungeon()
        }
    }

    try_increase_mastery() {
        if (this.current_mastery + 1 <= this.max_mastery) {
            this.current_mastery += 1
            this.current_level = 1
            this.reset_dungeon()
        }
    }

    try_decrease_mastery() {
        if (this.current_mastery - 1 > 0) {
            this.current_mastery -= 1
            this.current_level = 1
            this.reset_dungeon()
        }
    }

    set_auto_change_level(checked: boolean) {
        this.auto_change_level = checked
    }

    reset_dungeon() {
        this.following_path = false
        this.dungeon_active = false
        this.start_dungeon()
    }

    // Returns true if move was valid
    compute_manual_move(direction: string) {
        if (direction == "up") {
            if (this.player_pos[0]-1 >= 0 && this.grid[this.player_pos[0]-1][this.player_pos[1]].is_accessible) {
                this.make_player_move(this.player_pos, [this.player_pos[0]-1, this.player_pos[1]])
                return true
            }
        }
        else if (direction == "down") {
            if (this.player_pos[0]+1 < this.grid_size && this.grid[this.player_pos[0]+1][this.player_pos[1]].is_accessible) {
                this.make_player_move(this.player_pos, [this.player_pos[0]+1, this.player_pos[1]])
                return true
            }
        }
        else if (direction == "left") {
            if (this.player_pos[1]-1 >= 0 && this.grid[this.player_pos[0]][this.player_pos[1]-1].is_accessible) {
                this.make_player_move(this.player_pos, [this.player_pos[0], this.player_pos[1]-1])
                return true
            }
        }
        else if (direction == "right") {
            if (this.player_pos[1]+1 < this.grid_size && this.grid[this.player_pos[0]][this.player_pos[1]+1].is_accessible) {
                this.make_player_move(this.player_pos, [this.player_pos[0], this.player_pos[1]+1])
                return true
            }
        }

        return false
    }

    // Make random move
    make_player_move(starting_pos: number[], target_pos: number[]) {
        let player: Player = this.grid[starting_pos[0]][starting_pos[1]].occupant as Player;

        // Do effect based on what the player is walking into
        let new_occupant = this.grid[target_pos[0]][target_pos[1]].occupant
        if (new_occupant instanceof Enemy || new_occupant instanceof Boss) {
            // Fight enemy
            let result = this.fight_enemy(new_occupant) 

            if (result && new_occupant instanceof Boss) {
                if (this.current_level < 20 && this.current_level == this.max_levels[this.current_mastery]) {
                    this.max_levels[this.current_mastery] = this.current_level + 1
                    useStore.getState().setMaxLevels(this.current_mastery, this.max_levels)
                    if (this.auto_change_level) this.current_level += 1;
                }
                else if (this.current_level < 20) {
                    if (this.auto_change_level) this.current_level += 1;
                }
                else if (this.current_mastery == this.max_mastery && this.max_mastery < 5) {
                    this.max_mastery = this.current_mastery + 1
                    useStore.getState().setMaxMastery(this.dungeon_name, this.max_mastery)
                }
                this.following_path = false
                this.dungeon_active = false
                this.add_to_output('Defeated the boss.', 'kill')
                this.start_dungeon()
                return
            }
            else if (!result) {
                this.following_path = false
                this.dungeon_active = false
                this.start_dungeon()
                return
            }
            
        }
        else if (new_occupant instanceof Chest) {
            let { addCoins } = useStore.getState()
            addCoins(new_occupant.value)
        }
        

        this.grid[starting_pos[0]][starting_pos[1]].occupant = null
        this.grid[target_pos[0]][target_pos[1]].occupant = player
        this.player_pos = target_pos

        const { incrementTick } = useStore.getState()
        incrementTick()

    }

    add_to_output(text, type) {
        if (this.output_text.length > 100) {
            this.output_text.shift()
        }
        this.output_text.push({text: text, type: type})
    }

    // True if won, false if lost
    fight_enemy(enemy: Enemy) {
        const { alertManager } = useStore.getState()
        let player: Player = this.grid[this.player_pos[0]][this.player_pos[1]].occupant as Player;
        while (true) {
            enemy.health -= player.get_attack()
            if (enemy.health <= 0) {
                this.output_text.push({text: 'Killed '+enemy.name+'. '+player.health+' health remaining.', type: 'kill'})
                let { addCoins } = useStore.getState()
                addCoins(enemy.coin_value)
                let items = enemy.drop_items(this.current_mastery)
                for (let i = 0; i < items.length; i++) {
                    player.add_item_to_inventory(items[i])
                    this.add_to_output((enemy.name.charAt(0).toUpperCase() + enemy.name.slice(1)) + " dropped "+items[i].name+"!", 'drop')
                    if (items[i].rates[this.current_mastery-1] <= .1) {
                        alertManager.add_alert((enemy.name.charAt(0).toUpperCase() + enemy.name.slice(1)) + " dropped "+items[i].name+"!")
                        
                    }
                        
                }

                return true
            }

            player.health -= enemy.attack
            if (player.health <= 0) {
                this.add_to_output('u died', 'kill')
                triggerFlash()
                return false
            }

        }
            
    }
}

export default Dungeon