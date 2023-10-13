/**  내부 함수가 호출되는 빈도를 제한 */
export const throttle = (func: (args: any) => void, delay: number) => {
  let lastRun = 0;
  return (...args: any) => {
    const now = Date.now();
    if (now - lastRun >= delay) {
      func.apply(this, args);
      lastRun = now;
    }
  };
};
