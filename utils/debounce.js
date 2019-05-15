// eslint-disable-next-line no-unused-vars
function debounce(func, delay, immediate = false) {
  let timer = null; // 定时器
  let context = null; // 获取上下文对象，即this
  let args = null; // 获取传入的参数
  const later = () => setTimeout(
    (() => {
      func.apply(context, args);
    }),
    delay
  );
  // 定义延迟函数
  function debounceFunc(...params) {
    args = params;
    context = this;
    if (timer) {
      // 已经触发过，再次触发，重新计时
      clearTimeout(timer);
      timer = later();
    } else if (immediate) {
      // 不需要防抖处理
      func.apply(context, args);
    } else {
      timer = later();
    }
  }
  debounceFunc.cancel = () => {
    clearTimeout(timer);
    timer = null;
  };
  return debounceFunc;
}
