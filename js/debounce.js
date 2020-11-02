'use strict';
(function () {
  const DEBOUNCE_INTERVAL = 500; // ms
  let lastTimeout;

  window.debounce = function (cb) {
    return function () {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        cb();
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
