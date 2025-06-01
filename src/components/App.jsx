import { useState, useEffect } from 'react'
import { movePlayerRandomly } from '~/gameLogic';
import DungeonLayout from './DungeonLayout';
import DungeonInfo from './DungeonInfo';
import Score from './Score';
import DungeonOutput from './DungeonOutput';
import Inventory from './Inventory';
import './App.css'
import Upgrades from './Upgrades';

import AlertContainer from './AlertContainer';
function App() {


  return (
    <>
    <AlertContainer></AlertContainer>
    <DungeonInfo></DungeonInfo>
    <Upgrades></Upgrades>
      <Score></Score>
        <Inventory></Inventory>
    <div className='flex flex-col items-center justify-center w-[80%] mx-auto p-0 m-0'>
        <div className='w-full max-w-[800px] aspect-[1/1] bg-[rgb(43,43,43)] rounded-sm flex justify-center items-center'>
            <DungeonLayout></DungeonLayout>
        </div>
        <div className='w-full h-[200px] max-w-[800px] flex justify-start items-start flex-col-reverse overflow-auto bg-[rgb(19,19,19)] mb-[50px]'>
            <DungeonOutput></DungeonOutput>
        </div>
        
    </div>

      
      
    </>
  )
}

export default App
