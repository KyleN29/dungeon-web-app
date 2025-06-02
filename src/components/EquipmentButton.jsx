import {useState} from 'react'
import EquipmentSelection from './EquipmentSelection'
function EquipmentButton({type}) {
    const [isVisible, setIsVisible] = useState(false)
    return (
    <>
    <div onClick={() => (setIsVisible(!isVisible))} className="flex flex-col justify-between items-center relative w-32 h-32 bg-neutral-800 rounded-xl cursor-pointer hover:bg-neutral-900">{type}</div>
    {
        isVisible && (
            <EquipmentSelection isVisible={isVisible} setIsVisible={setIsVisible} type={type}></EquipmentSelection>
        )
    }
    </>
    
    )
}
export default EquipmentButton