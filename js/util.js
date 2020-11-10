'use strict';

(function () {
  const getRandomNumber = function (min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
  };

  window.util = {
    random: getRandomNumber,
  };
})();
