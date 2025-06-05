import {useState} from 'react'
import useStore from '../store'
import EquipmentSelection from './EquipmentSelection'

function getItemEquipped(type) {
    const {equippedWeapon, equippedArmor} = useStore.getState()
    if (type == "Weapon" && equippedWeapon) {
        return equippedWeapon
    }
    else if (type == "Helmet" && equippedArmor["Helmet"]) {
        return equippedArmor["Helmet"]
    }
    else if (type == "Chestplate" && equippedArmor["Chestplate"]) {
        return equippedArmor["Chestplate"]
    }
    else if (type == "Leggings" && equippedArmor["Leggings"]) {
        return equippedArmor["Leggings"]
    }
    else if (type == "Boots" && equippedArmor["Boots"]) {
        return equippedArmor["Boots"]
    }
    else {
        return null
    }
}

function EquipmentButton({type}) {
    const [isVisible, setIsVisible] = useState(false)
    const equippedWeapon = useStore((s) => s.equippedWeapon);
    const equippedArmor = useStore((s) => s.equippedArmor)
    const itemEquipped = getItemEquipped(type)
    return (
    <>
    <div onClick={() => (setIsVisible(!isVisible))} className="flex flex-col justify-between items-center relative w-32 h-32 bg-neutral-800 rounded-xl cursor-pointer hover:bg-neutral-900">
        {type}<br></br>{itemEquipped ? itemEquipped.name : ""}
        </div>
    {
        isVisible && (
            <EquipmentSelection isVisible={isVisible} setIsVisible={setIsVisible} type={type}></EquipmentSelection>
        )
    }
    </>
    
    )
}
export default EquipmentButton