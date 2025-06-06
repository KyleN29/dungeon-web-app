import { useState, useEffect } from 'react'
import { movePlayerRandomly } from '~/gameLogic';
import Player from '~/game_objects/Player'
import Enemy from '~/game_objects/Enemy'
import Boss from '~/game_objects/Boss';
import Chest from '~/game_objects/Chest'
import Score from './Score';
import DungeonOutput from './DungeonOutput';
import reactLogo from '~/assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useStore from '~/store';
import { useFlashTrigger } from '~/game_objects/useFlashTrigger';
import { registerFlashTrigger } from '~/game_objects/flashController';
function renderDungeon(dungeon) {
    let rendered_dungeon = []
    dungeon.forEach((row, rowIndex) => {
        let new_row = []
        row.forEach((cell, colIndex) => {
            if (cell.occupant == null && cell.is_accessible) {
                new_row.push(' ')
            }
            else if (cell.occupant instanceof Player) {
                new_row.push('🧙')
            }
            else if (cell.occupant == null & !cell.is_accessible) {
                new_row.push('')
            }
            else if (cell.occupant instanceof Boss) {
                new_row.push('🤬')
            }
            else if (cell.occupant instanceof Enemy) {
                new_row.push('👿')
            }
            else if (cell.occupant instanceof Chest) {
                new_row.push('💰')
            }
        })
        rendered_dungeon.push(new_row)
    })
    return rendered_dungeon

}
function getCellClass(cell, isFlash, dungeonName) {
    if (isFlash) return 'bg-red-500 bg-opacity-50'
    let backgroundColor = "bg-[rgb(43,43,43)]"
    let cellColor = "bg-[rgb(20,20,20)]"
    let border = "border-[rgb(43,43,43)]"
    if (dungeonName == "Slime Dungeon") {
        backgroundColor = "bg-green-600"
        cellColor = "bg-green-800"
        border = "border-green-600"
        console.log("Green1!")
    }
    
    if (!cell) return `${backgroundColor} aspect-square`;
    
    
    

    const base = `border-2 ${border} ${cellColor} aspect-square flex items-center justify-center text-sm sm:text-base md:text-lg`;
    const colorMap = {
      P: 'text-green-400',
      E: 'text-red-500',
      B: 'text-red-800',
      C: 'text-yellow-400',
    };
  
    const occupantClass = colorMap[cell] || 'text-white';
  
    return `${base} ${occupantClass}`;
  }
function DungeonLayout() {
    const flash = useFlashTrigger(registerFlashTrigger);
  const dungeon = useStore((s) => s.dungeons[s.currentDungeonKey])
  const dungeonKey = useStore((s) => (s.currentDungeonKey))
  useEffect(() => {
    dungeon.start_dungeon()
  }, [dungeonKey])
  // Important in order for the component to update at correct times
  const tick = useStore((s) => s.tick);

  return (
    <>
    <div id="flashTarget" style={{
    gridTemplateColumns: `repeat(${dungeon.grid_size}, minmax(0, 1fr))`,
  }} className={`grid w-full h-full gap-[0px] border-collapse`}>
        {renderDungeon(dungeon.grid).flat().map((cell, index) => (
            <div key={index} className={getCellClass(cell, flash, dungeonKey)}>{cell}</div>
        ))}
      
    </div>
      
    </>
  )
}

export default DungeonLayout
