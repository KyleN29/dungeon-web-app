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
    const enemy_info = dungeon.get_dungeon_enemy_info(true)
    const { dungeonStats } = useStore.getState()
  const tick = useStore((s) => s.tick); 

  return (
    <>
    <div>{dungeon.current_dungeon}, 
        <br />Mastery: {dungeon.current_mastery} (Max: {dungeon.max_mastery})<button className="bg-neutral-500 cursor-pointer hover:bg-neutral-600 rounded w-[60px]" onClick={() => dungeon.try_decrease_mastery()}>Down</button> <button className="bg-neutral-500 cursor-pointer hover:bg-neutral-600 rounded w-[60px]" onClick={() => dungeon.try_increase_mastery()}>Up</button>
        <input defaultChecked onChange={(e) => dungeon.set_auto_change_level(e.target.checked)} type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input><br></br>Level: {dungeon.current_level} (Max: {dungeon.max_levels[dungeon.current_mastery]})<button className="bg-neutral-500 cursor-pointer hover:bg-neutral-600 rounded w-[60px]" onClick={() => dungeon.try_decrease_level()}>Down</button> <button className="bg-neutral-500 cursor-pointer hover:bg-neutral-600 rounded w-[60px]" onClick={() => dungeon.try_increase_level()}>Up</button>
        {Object.keys(enemy_info).map((enemy, index) =>
        {
            let drops = []
            for (let i = 0; i < enemy_info[enemy].length; i++) {
                drops.push(enemy_info[enemy][i])
            }
            
        return <div key={index}>{enemy} (Health: {enemy_info[enemy].health}, Attack: {enemy_info[enemy].attack}){enemy_info[enemy].drops.map((item, dropIndex) => {
            return <div key={dropIndex}>{item.name}-{item.rates[dungeon.current_mastery-1] * 100}%</div>
        })}</div>
        })}
        </div>
      
    </>
  )
}

export default DungeonInfo
