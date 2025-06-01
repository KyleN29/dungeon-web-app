import {useState} from 'react'
import useStore from '../store';
function equipSelectedWeapon(itemName) {
    const { equipWeapon } = useStore.getState()

    equipWeapon(itemName)
}

function InventorySlot({ itemName, itemType, itemQuantity, itemDescription }) {
    const { equippedWeapon } = useStore.getState()
    const [isEquipped, setIsEquipped] = useState(equippedWeapon && equippedWeapon.name == itemName)
    const [isHovered, SetIsHovered] = useState(false);

  return (
    <>
        <div onMouseEnter={() => SetIsHovered(true)} onMouseLeave={() => SetIsHovered(false)} className='flex flex-col justify-between items-center relative w-32 h-32 bg-neutral-800 rounded-xl'>
            {itemName} - {itemType} - {itemQuantity} - {itemDescription}
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
                itemType == 'Weapon' && (!isEquipped) && (
                    <button onClick={() => {equipSelectedWeapon(itemName); setIsEquipped(true)}} className='bg-green-400 transition duration-300 cursor-pointer hover:bg-green-600 w-[60%] mb-[5px] rounded'>Equip</button>
                )
            }
            
        </div>
    </>
  )
}

export default InventorySlot
