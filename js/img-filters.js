'use strict';
(function () {
  const imgFilters = document.querySelector('.img-filters');
  const filterDefault = imgFilters.querySelector('#filter-default');
  const filterRandom = imgFilters.querySelector('#filter-random');
  const filterDiscussed = imgFilters.querySelector('#filter-discussed');

  const removePictures = function () {
    const pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (element) {
      element.remove();
    });
  };

  const applyRandomFilter = function (clientData) {
    filterRandom.addEventListener('click', function () {
      resetActiveClass();
      filterRandom.classList.add('img-filters__button--active');

      const getRandomPhotos = function () {

        const newData = clientData;


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

        removePictures();
        window.gallery.render(getNewData());
      };

      window.debounce(getRandomPhotos);

    });
  };

  const applyDefaultFilter = function (clientData) {
    filterDefault.addEventListener('click', function () {
      resetActiveClass();
      filterDefault.classList.add('img-filters__button--active');

      const getDefaultPhotos = function () {
        removePictures();
        window.gallery.render(clientData);
      };

      window.debounce(getDefaultPhotos);

    });
  };

  const applyDiscussedFilter = function (clientData) {
    filterDiscussed.addEventListener('click', function () {
      resetActiveClass();
      filterDiscussed.classList.add('img-filters__button--active');

      const getDiscussedPhotos = function () {
        removePictures();

        window.gallery.render(clientData.sort(function (photo1, photo2) {
          return photo2.comments.length - photo1.comments.length;
        }));
      };

      window.debounce(getDiscussedPhotos);

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
