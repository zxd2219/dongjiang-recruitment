const throttle = (fn: any, wait = 500) => {
  let last = 0;
  return (...args: any) => {
    const now = new Date().getTime();
    if (now - last >= wait) {
      fn(...args);
      last = new Date().getTime();
    }
  };
};

export { throttle };
