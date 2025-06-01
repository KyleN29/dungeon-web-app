import { useState, useEffect } from 'react'
import { movePlayerRandomly } from '~/gameLogic';
import Player from '~/game_objects/Player'
import Enemy from '~/game_objects/Enemy'
import Chest from '~/game_objects/Chest'

import reactLogo from '~/assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useStore from '~/store';

function renderDungeon(dungeon) {
    let rendered_dungeon = []
    dungeon.forEach((row, rowIndex) => {
        let new_row = []
        row.forEach((cell, colIndex) => {
            if (cell.occupant == null && cell.is_accessible) {
                new_row.push(' ')
            }
            else if (cell.occupant instanceof Player) {
                new_row.push('P')
            }
            else if (cell.occupant == null & !cell.is_accessible) {
                new_row.push('')
            }
            else if (cell.occupant instanceof Enemy) {
                new_row.push('E')
            }
            else if (cell.occupant instanceof Chest) {
                new_row.push('C')
            }
        })
        rendered_dungeon.push(new_row)
    })
    return rendered_dungeon

}
function getCellClass(cell) {
    if (!cell) return 'bg-[rgb(34,34,34)]';
  
    const base = 'border border-neutral-900 bg-neutral-500 w-8 h-8';
    const colorMap = {
      P: 'text-green-400',
      E: 'text-red-500',
      C: 'text-yellow-400',
    };
  
    const occupantClass = colorMap[cell] || 'text-white';
  
    return `${base} ${occupantClass}`;
  }
function Score() {
    const dungeon = useStore((state) => state.dungeon);
    const coins = useStore((state) => state.coins);
    
  const player = dungeon.get_player()
  const tick = useStore((s) => s.tick);

  return (
    <>
        <div>
            {player && (
            <div>

            Coins: {coins} 
            Health: {player.health}
            Moves: {dungeon.moves}
            </div>
            )}
            
        </div>
    </>
  )
}

export default Score
