// flashController.js
let triggerFn = null;

export function registerFlashTrigger(fn) {
  triggerFn = fn;
}

export function triggerFlash() {
  if (typeof triggerFn === 'function') {
    triggerFn();
  }
}
