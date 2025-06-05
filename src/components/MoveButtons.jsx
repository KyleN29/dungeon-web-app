import { useEffect, useRef, useState } from "react";
import useStore from "../store";

function MoveButtons() {
  const hasMounted = useRef(false);
  const [onMoveCooldown, setOnMoveCooldown] = useState(false);
  const [cooldownProgress, setCooldownProgress] = useState(0); // 0–100

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    let interval;
    if (onMoveCooldown) {
      const start = Date.now();
      const duration = 1000;

      interval = setInterval(() => {
        const elapsed = Date.now() - start;
        const percent = Math.max(0, 100 - (elapsed / duration) * 100);
        setCooldownProgress(percent);

        if (elapsed >= duration) {
          setOnMoveCooldown(false);
          clearInterval(interval);
        }
      }, 20);
    }

    return () => clearInterval(interval);
  }, [onMoveCooldown]);

  function move(direction) {
    if (onMoveCooldown) return;
    const { dungeon } = useStore.getState();
    const result = dungeon.compute_manual_move(direction);

    if (result) {
      setOnMoveCooldown(true);
      setCooldownProgress(100);
    }
  }

  return (
    <>
      <div className="relative w-40 h-2 bg-gray-300 rounded overflow-hidden mb-2">
        <div
          className="absolute top-0 left-0 h-full bg-red-500"
          style={{ width: `${cooldownProgress}%` }}
        />
      </div>

        <button className="w-[40px] h-[40px] bg-neutral-500 hover:bg-neutral-600 cursor-pointer" onClick={() => move("up")}>Up</button>
        <button className="w-[40px] h-[40px] bg-neutral-500 hover:bg-neutral-600 cursor-pointer" onClick={() => move("down")}>Down</button>
        <button className="w-[40px] h-[40px] bg-neutral-500 hover:bg-neutral-600 cursor-pointer" onClick={() => move("left")}>Left</button>
        <button className="w-[40px] h-[40px] bg-neutral-500 hover:bg-neutral-600 cursor-pointer" onClick={() => move("right")}>Right</button>
    </>
  );
}

export default MoveButtons;
