import { useState, useEffect } from 'react'
import { movePlayerRandomly } from '~/gameLogic';
import Player from '~/game_objects/Player'
import Enemy from '~/game_objects/Enemy'
import Boss from '~/game_objects/Boss';
import Chest from '~/game_objects/Chest'
import Score from './Score';
import DungeonOutput from './DungeonOutput';

import './App.css'
import useStore from '~/store';


function DungeonInfo() {
  const dungeon = useStore((s) => s.dungeon)
    const enemy_info = dungeon.get_dungeon_enemy_info()
    const { dungeonStats } = useStore.getState()
  const tick = useStore((s) => s.tick); 

  return (
    <>
    <div>{dungeon.current_dungeon}, <br></br>Times Completed: {dungeonStats[dungeon.current_dungeon]["levelsCompleted"]} {Object.keys(enemy_info).map((enemy, index) =>
        {
            let drops = []
            for (let i = 0; i < enemy_info[enemy].length; i++) {
                drops.push(enemy_info[enemy][i])
            }
            
        return <div key={index}>{enemy}-{enemy_info[enemy].map((drop, dropIndex) => {
            const {item, rate} = drop;
            return <div key={dropIndex}>{item.name}-{rate * 100}%</div>
        })}</div>
        })}
        </div>
      
    </>
  )
}

export default DungeonInfo
