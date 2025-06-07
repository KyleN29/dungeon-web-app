import { useState, useEffect } from 'react'

import './App.css'
import useStore from '~/store';
import { saveUpgradeData } from '../storageHelpers';
function Upgrades() {
  const { upgradeManager } = useStore.getState()
  const tick = useStore((state) => (state.tick))
  let upgrades = upgradeManager.get_all_upgrades()
  return (
    <>
        <button className="w-[40px] bg-neutral-600 hover:bg-neutral-700 cursor-pointer" onClick={() => (saveUpgradeData())}>Save :P</button>
        <div className='flex flex-col'>
           { upgrades.map((upgrade, index) => (
            <button onClick={() => {upgradeManager.buy_upgrade(upgrade)}} key={index} className='w-[50%] bg-neutral-400 hover:bg-neutral-500'>{upgrade.name}-{upgrade.level}</button>
           ))}
        </div>
    </>
  )
}

export default Upgrades
