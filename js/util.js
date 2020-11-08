'use strict';

(function () {
  const getRandomNumber = function (min, max) {
    const random = Math.floor((Math.random() * (max - min)) + min);
    return random;
  };

  window.util = {
    random: getRandomNumber,
  };
})();
