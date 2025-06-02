import { useEffect, useState, useCallback } from 'react';

export function useFlashTrigger(registerTrigger, duration = 150) {
  const [flash, setFlash] = useState(false);

  const trigger = useCallback(() => {
    setFlash(true);
    setTimeout(() => setFlash(false), duration);
  }, [duration]);

  useEffect(() => {
    registerTrigger(trigger); // external code gets access
  }, [registerTrigger, trigger]);

  return flash;
}