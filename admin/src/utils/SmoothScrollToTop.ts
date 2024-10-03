// utils/smoothScrollToTop.ts
export const smoothScrollToTop = (duration: number) => {
  const start = window.scrollY;
  const startTime = performance.now();

  const scroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeInOut = 0.5 - Math.cos(progress * Math.PI) / 2; // Easing function

    window.scrollTo(0, start * (1 - easeInOut));

    if (progress < 1) {
      requestAnimationFrame(scroll);
    }
  };

  requestAnimationFrame(scroll);
};
