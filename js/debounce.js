'use strict';
(function () {
  const DEBOUNCE_INTERVAL = 500; // ms

  const getFilter = function () {
    let lastTimeout = null;

    return function (cb) {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        cb();
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.debounce = getFilter();
})();
