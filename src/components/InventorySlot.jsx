import {useState} from 'react'
import useStore from '../store';
function equipItem(item) {
    const { equipWeapon, equipArmor } = useStore.getState()
    if (item.type == "Weapon") {
        equipWeapon(item.id)
    }
    else {
        equipArmor(item.id)
    }
}

function isItemEquipped(item, equippedWeapon, equippedArmor) {
    if ((equippedWeapon && item.id == equippedWeapon.id) || (equippedArmor["Helmet"] && equippedArmor["Helmet"].id == item.id) || (equippedArmor["Chestplate"] && equippedArmor["Chestplate"].id == item.id)
         || (equippedArmor["Leggings"] && equippedArmor["Leggings"].id == item.id) || (equippedArmor["Boots"] && equippedArmor["Boots"].id == item.id)) {
        return true
    }
    return false
}

function InventorySlot({ item, equippedWeapon, equippedArmor}) {
    const isEquipped = isItemEquipped(item, equippedWeapon, equippedArmor)

    const [isHovered, SetIsHovered] = useState(false);
  return (
    <>
        <div onMouseEnter={() => SetIsHovered(true)} onMouseLeave={() => SetIsHovered(false)} className='flex flex-col justify-between items-center relative w-32 h-32 bg-neutral-800 rounded-xl'>
            {item.name} - {item.type} - {item.quantity} - {item.description}
            {
                isHovered && (
                    <div className='absolute top-0 -translate-y-5 left-full ml-2 min-w-[150px] min-h-[175px] bg-neutral-700 z-30 rounded-xl'>HOVERING</div>
                )
            }
            {
                isEquipped && (
                    <button className='bg-neutral-400   w-[60%] mb-[5px] rounded'>Equipped</button>
                )
            }
            {
                (item.type != 'Material') && (!isEquipped) && (
                    <button onClick={() => {equipItem(item);}} className='bg-green-400 transition duration-300 cursor-pointer hover:bg-green-600 w-[60%] mb-[5px] rounded'>Equip</button>
                )
            }
            
        </div>
    </>
  )
}

export default InventorySlot
