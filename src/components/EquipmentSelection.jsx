import useStore from "../store";
import InventorySlot from "./InventorySlot";
function EquipmentSelection({isVisible, setIsVisible, type}) {
    const inventory = useStore((s) => s.inventory)
    // Important in order for the component to update at correct times
    // const tick = useStore((s) => s.tick);
    const equippedWeapon = useStore((s) => s.equippedWeapon);
    const equippedArmor = useStore((s) => s.equippedArmor)
    
  return (
    <> 
       {
        (
    <div className='fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center pointer-events-none'>
                {/* Click outside to close */}
    <div 
      className="absolute inset-0 pointer-events-auto bg-black/50 z-10"
      onClick={() => setIsVisible(!isVisible)}
    />
                <div className='p-8 flex flex-wrap items-start justify-start gap-8 content-start bg-neutral-500 p4 rounded shadow w-[80%] h-[80%] pointer-events-auto z-20'>
                    {inventory.map((item, index) => {
                        if (item.type != type) {
                            return;
                        }
                        return <div key={index}><InventorySlot item={item} equippedWeapon={equippedWeapon} equippedArmor={equippedArmor}></InventorySlot></div>
                    }
                        
                    )}
                </div>
            </div>
        )
       }
    </>
  )
}
export default EquipmentSelection