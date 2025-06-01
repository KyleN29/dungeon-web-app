import {useState} from 'react'
import InventorySlot from './InventorySlot';
import useStore from '~/store';

function Inventory() {
    const [visible, setVisible] = useState(false);
    const inventory = useStore((s) => s.inventory)
    // Important in order for the component to update at correct times
    const tick = useStore((s) => s.tick);

  return (
    <>
       <button onClick={() => setVisible(!visible)}>Inventory</button>
       {
        visible && (
            <div className='absolute top-0 left-0 z-50 w-screen h-screen flex items-center justify-center pointer-events-none'>
                {/* Click outside to close */}
    <div 
      className="absolute inset-0 pointer-events-auto bg-black/50 z-10"
      onClick={() => setVisible(false)}
    />
                <div className='p-8 flex flex-wrap items-start justify-start gap-8 content-start bg-neutral-500 p4 rounded shadow w-[80%] h-[80%] pointer-events-auto z-20'>
                    {inventory.map((item, index) => (
                        <div key={index}><InventorySlot itemName={item.name} itemType={item.type} itemQuantity={item.quantity} itemDescription={item.description}></InventorySlot></div>
                    ))}
                </div>
            </div>
        )
       }
    </>
  )
}

export default Inventory
