/**
 * Animation Frame Utilities
 * Helper functions for coordinating animations with the browser's render cycle
 */

/**
 * Schedules a callback to run on the next animation frame
 * Use this when you need to trigger a visual state change
 *
 * @returns Promise that resolves on the next animation frame
 *
 * @example
 * await nextFrame();
 * showElement.value = true; // Triggers CSS transition in sync with repaint
 */
export const nextFrame = (): Promise<void> => {
  return new Promise(resolve => {
    requestAnimationFrame(() => resolve());
  });
};

/**
 * Schedules a callback after a delay, synced to animation frame
 * Better than setTimeout for visual changes as it coordinates with browser repaint
 *
 * @param ms - Delay in milliseconds
 * @returns Promise that resolves after delay, on next animation frame
 *
 * @example
 * await delayFrame(200);
 * showElement.value = true; // Triggers after 200ms, synced to repaint
 */
export const delayFrame = (ms: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      requestAnimationFrame(() => resolve());
    }, ms);
  });
};

/**
 * Waits for multiple animation frames
 * Useful when you need to ensure styles are fully applied
 *
 * @param count - Number of frames to wait (default: 2)
 * @returns Promise that resolves after specified number of frames
 */
export const waitFrames = (count: number = 2): Promise<void> => {
  return new Promise(resolve => {
    let remaining = count;
    const tick = () => {
      remaining--;
      if (remaining <= 0) {
        resolve();
      } else {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  });
};
