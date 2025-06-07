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
        <div onMouseEnter={() => SetIsHovered(true)} onMouseLeave={() => SetIsHovered(false)} className='flex flex-col items-center content-between relative w-36 h-36 bg-neutral-800 rounded-xl'>
            <div className="flex flex-col items-center">
                <div>{item.name}</div>
            <hr className="border-t-2 border-gray-300 w-[100px]"></hr>
            {
                item.type != "Material" && (
                    <div className="text-green-500">97% Quality</div>
                )
            }
            
            </div>            
            <div className="flex flex-col w-full">
                {
                    item.type == "Weapon" &&
                    (
                        <div className="text-left w-full ml-4">-Attack: {item.attack}</div>
                    )
                }
                {
                    ["Helmet", "Chestplate", "Leggings", "Boots"].includes(item.type) &&
                    (
                        <>
                        <div className="text-left w-full ml-4">-Health: {item.health}</div>
                        <div className="text-left w-full ml-4">-Defense: {item.defense}</div>
                        </>
                        
                    )
                }
            </div>
            <div className="flex flex-row items-end h-full w-full">
                <div className="relative w-full mb-1">
                    <div className="absolute left-2" >{item.quantity}x</div>
                    <div className="text-purple-600 italic text-center w-full">Epic</div>
                    {
                    item.type !== 'Material' && !isEquipped && (
                        <input
                        type="checkbox"
                        onChange={(e) => {
                            if (e.target.checked) {
                                equipItem(item);
                                setDisabled(true); // disable after first check
                            }
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 accent-green-500 cursor-pointer"
                        />
                    )
                    }
                    {
                    isEquipped && (
                        <input
                        defaultChecked
                        disabled
                        type="checkbox"
                        onChange={() => equipItem(item)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 accent-green-500 cursor-pointer"
                        />
                    )
                }
                </div>
            </div>
            
            {
                isHovered && (
                    <div className='absolute top-0 -translate-y-5 left-full ml-2 min-w-[150px] min-h-[175px] bg-neutral-700 z-30 rounded-xl'>HOVERING</div>
                )
            }
            
        </div>
    </>
  )
}

export default InventorySlot
