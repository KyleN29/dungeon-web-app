import useStore from "../store";
class AlertManager {
    alerts: any
    constructor() {
        this.alerts = []
    }

add_alert(alertText) {
    const {incrementTick} = useStore.getState()
  const id = Date.now();
  const alert = { id, text: alertText, visible: true };
  this.alerts.push(alert);
  incrementTick()

  // Hide after 2s
  setTimeout(() => {
    alert.visible = false;
     incrementTick()

    // Remove after transition ends
    setTimeout(() => {
      this.alerts = this.alerts.filter(a => a.id !== id);
       incrementTick()
    }, 500); // match the transition duration
  }, 5000);
}

    remove_alert(index: number) {
        const {incrementTick} = useStore.getState()
        this.alerts = this.alerts.splice(index, 1)
        incrementTick()
    }


}
export default AlertManager