'use strict';
(function () {
  const imgFilters = document.querySelector('.img-filters');
  const filterDefault = imgFilters.querySelector('#filter-default');
  const filterRandom = imgFilters.querySelector('#filter-random');
  const filterDiscussed = imgFilters.querySelector('#filter-discussed');

  const applyRandomFilter = function (clientData) {
    filterRandom.addEventListener('click', function () {
      resetActiveClass();
      filterRandom.classList.add('img-filters__button--active');

      const cb = function () {

        const newData = clientData;
        const pictures = document.querySelectorAll('.picture');

        const getNewData = function (arr = newData) {
          const MAX_PHOTO_SHOW = 10;

          let newArray = [];
          while (newArray.length < MAX_PHOTO_SHOW) {
            const newImg = arr[window.util.random(0, newData.length)];
            if (!newArray.includes(newImg)) {
              newArray.push(newImg);
            }
          }
          return newArray;
        };
        pictures.forEach(function (element) {
          element.remove();
        });
        window.gallery.render(getNewData());
      };

      window.debounce(cb);

    });
  };

  const applyDefaultFilter = function (clientData) {
    filterDefault.addEventListener('click', function () {
      resetActiveClass();
      filterDefault.classList.add('img-filters__button--active');

      const cb = function () {
        const pictures = document.querySelectorAll('.picture');
        pictures.forEach(function (element) {
          element.remove();
        });
        window.gallery.render(clientData);
      };

      window.debounce(cb);

    });
  };

  const applyDiscussedFilter = function (clientData) {
    filterDiscussed.addEventListener('click', function () {
      resetActiveClass();
      filterDiscussed.classList.add('img-filters__button--active');

      const cb = function () {
        const pictures = document.querySelectorAll('.picture');
        pictures.forEach(function (element) {
          element.remove();
        });

        const comparator = function (left, right) {
          if (left > right) {
            return 1;
          } else if (left < right) {
            return -1;
          } else {
            return 0;
          }
        };

        window.gallery.render(clientData.sort(function (left, right) {
          let diff = comparator(right.comments.length, left.comments.length);

          return diff;
        }));
      };

      window.debounce(cb);

    });
  };

  const resetActiveClass = function () {
    filterDefault.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
  };

  window.imgFilters = {
    filterForm: imgFilters,
    randomFilter: applyRandomFilter,
    defaultFilter: applyDefaultFilter,
    discussedFilter: applyDiscussedFilter,
  };

})();
