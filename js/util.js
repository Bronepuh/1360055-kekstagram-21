'use strict';

(function () {
  let getRandomNumber = function (min, max) {
    let random = Math.floor((Math.random() * (max - min)) + min);
    return random;
  };

  window.util = {
    random: getRandomNumber,
  };
})();
