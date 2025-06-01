import './App.css'
import useStore from '../store'


function AlertContainer() {
    const { alertManager } = useStore.getState()
    const tick = useStore((state) => state.tick)

  return (
    <>
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center space-y-2 pointer-events-none">
{
    alertManager.alerts.map((alert, index) => (
        <div className={`
        w-[300px] h-[50px] flex items-center justify-center rounded-2xl
        bg-neutral-600 border-2 border-gray-400 text-white z-50
        transition-opacity duration-500 ease-in-out
        ${alert.visible ? 'opacity-100' : 'opacity-0'}
      `} key={index}>
            <div>
                {alert.text}
            </div>
        </div>
    ))
   }
    </div>
   
      
    </>
  )
}

export default AlertContainer
