import type { MutableRefObject } from "react";
import { useCallback, useEffect, useState } from "react";

const useSwipe = (
  ref: MutableRefObject<HTMLElement | null>,
  params: Partial<{ onLeft: () => void; onRight: () => void }>,
) => {
  const [xDown, setXDown] = useState<number | null>(null);
  const [yDown, setYDown] = useState<number | null>(null);

  const handleTouchStart = useCallback((evt: TouchEvent) => {
    const firstTouch = evt.touches[0];
    setXDown(firstTouch.clientX);
    setYDown(firstTouch.clientY);
  }, []);

  const handleTouchMove = useCallback(
    (evt: TouchEvent) => {
      if (!xDown || !yDown) {
        return;
      }

      const xUp = evt.touches[0].clientX;
      const yUp = evt.touches[0].clientY;

      const xDiff = xDown - xUp;
      const yDiff = yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        /*most significant*/

        if (xDiff > 0) {
          if (!!params.onLeft) {
            params.onLeft();
          }
        } else {
          if (!!params.onRight) {
            params.onRight();
          }
        }
      } else {
        if (yDiff > 0) {
          /* up swipe */
        } else {
          /* down swipe */
        }
      }
      /* reset values */
      setXDown(null);
      setYDown(null);
    },
    [params, xDown, yDown],
  );

  useEffect(() => {
    const el = ref.current;

    if (el) {
      el.addEventListener("touchstart", handleTouchStart, { passive: true });
      el.addEventListener("touchmove", handleTouchMove, { passive: true });

      return () => {
        el.removeEventListener("touchstart", handleTouchStart);
        el.removeEventListener("touchmove", handleTouchMove);
      };
    }
  }, [ref, handleTouchMove, handleTouchStart]);
};

export { useSwipe };
