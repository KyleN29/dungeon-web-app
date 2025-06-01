import { useState, useEffect } from 'react'
import { movePlayerRandomly } from '~/gameLogic';
import Player from '~/game_objects/Player'
import Enemy from '~/game_objects/Enemy'
import Chest from '~/game_objects/Chest'

import reactLogo from '~/assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useStore from '~/store';

function DungeonOutput() {
  const dungeon = useStore(function(s) {return s.dungeon;})
  
  // Important in order for the component to update at correct times
  const tick = useStore((s) => s.tick);

  

  return (
    <>
        <div className='m-[5px]  flex items-start justify-start flex-col'>
            {dungeon.output_text.map((message, index) => {
                let color = 'rgb(255, 0, 0)';
                if (message.type == 'kill') {
                    color = 'rgb(255, 0, 0)'
                }
                else if (message.type == 'drop') {
                    color = 'rgb(0, 255, 0)'
                }
                else if (message.type == 'start') {
                    color = 'rgb(69, 117, 180)'
                }
                return <div style={{color}}key={index}>{message.text}</div>
})}
        </div>
    </>
  )
}

export default DungeonOutput
