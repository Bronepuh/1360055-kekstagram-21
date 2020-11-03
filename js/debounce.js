'use strict';
(function () {
  const DEBOUNCE_INTERVAL = 800; // ms

  const debounce = function (cb) {
    let lastTimeout = null;

    return function (...args) {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        cb(...args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.debounce = debounce;
})();

