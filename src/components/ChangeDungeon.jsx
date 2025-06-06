import { useState } from 'react'
import useStore from '../store'

function ChangeDungeon() {
    const dungeonNames = ["Goblin Dungeon", "Slime Dungeon"]
    const dungeonKey = useStore((s) => (s.currentDungeonKey))
    const [nameIndex, setNameIndex] = useState(0)

    function nextDungeon() {
        let nextIndex = nameIndex + 1
        if (nextIndex >= dungeonNames.length) {
            setNameIndex(0)
            useStore.getState().dungeons[dungeonKey].stop_dungeon()
            useStore.getState().setCurrentDungeonKey(dungeonNames[0])
            return
        }
        setNameIndex(nextIndex)
        useStore.getState().dungeons[dungeonKey].stop_dungeon()
        useStore.getState().setCurrentDungeonKey(dungeonNames[nextIndex])
    }

    return <>
    <button onClick={() => (nextDungeon())}>Current Dungeon: {dungeonNames[nameIndex]}</button>
    </>
}

export default ChangeDungeon