import { useState, useEffect } from 'react'
import { movePlayerRandomly } from '~/gameLogic';
import DungeonLayout from './DungeonLayout';
import DungeonInfo from './DungeonInfo';
import Score from './Score';
import DungeonOutput from './DungeonOutput';
import Inventory from './Inventory';
import './App.css'
import Upgrades from './Upgrades';
import EquipmentButton from './EquipmentButton';
import AlertContainer from './AlertContainer';
import MoveButtons from './MoveButtons';
function App() {
    /* 
    TODO:
    Make moving manual at the start with a button
    */

  return (
    <>
    <AlertContainer></AlertContainer>
    <DungeonInfo></DungeonInfo>
    <div className="flex flex-row">
    <EquipmentButton type="Weapon"></EquipmentButton>
    <EquipmentButton type="Helmet"></EquipmentButton>
    <EquipmentButton type="Chestplate"></EquipmentButton>
    <EquipmentButton type="Leggings"></EquipmentButton>
    <EquipmentButton type="Boots"></EquipmentButton>
    </div>
    
    <Upgrades></Upgrades>
    <MoveButtons></MoveButtons>
      <Score></Score>
        <Inventory></Inventory>
    <div  className='flex flex-col items-center justify-center w-[80%] mx-auto p-0 m-0'>
        <div id="flashTarget" className='w-full max-w-[600px] aspect-[1/1] rounded-sm flex justify-center items-center'>
            <DungeonLayout></DungeonLayout>
        </div>
        <div  className='w-full h-[200px] max-w-[600px] flex justify-start items-start flex-col-reverse overflow-auto bg-[rgb(19,19,19)] mb-[50px]'>
            <DungeonOutput></DungeonOutput>
        </div>
        
    </div>

      
      
    </>
  )
}

export default App
