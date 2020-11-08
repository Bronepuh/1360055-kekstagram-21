'use strict';
(function () {
  const MAX_RANDOM_PHOTOS = 10;
  const imgFilters = document.querySelector('.img-filters');
  const imgForm = document.querySelector('.img-filters__form');

  const removePictures = function () {
    const pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (element) {
      element.remove();
    });
  };

  const getRandomPhotos = function (photos) {
    let randomPhotos = [];
    while (randomPhotos.length < MAX_RANDOM_PHOTOS) {
      const newImg = photos[window.util.random(0, photos.length)];
      if (!randomPhotos.includes(newImg)) {
        randomPhotos.push(newImg);
      }
    }
    return randomPhotos;
  };

  const rerender = function (photos) {
    removePictures();
    window.gallery.render(photos);
  };

  const applyFilter = function (clientData, type) {
    switch (type) {
      case 'filter-random':
        const randomPhotos = getRandomPhotos(clientData);
        rerender(randomPhotos);
        break;
      case 'filter-discussed':
        const newData = clientData.slice();
        const mostDiscussedPhotos = newData.sort(function (photo1, photo2) {
          return photo2.comments.length - photo1.comments.length;
        });
        rerender(mostDiscussedPhotos);
        break;
      default:
        rerender(clientData);
        break;
    }
  };

  const bindFilters = function (clientData) {
    const debouncedApplyFilter = window.debounce(function (filterType) {
      applyFilter(clientData, filterType);
    });
    imgForm.addEventListener('click', function (evt) {
      if (!evt.target.classList.contains('img-filters__button')) {
        return;
      }
      const button = evt.target;
      const filterType = button.id;
      const activeButton = imgForm.querySelector('.img-filters__button--active');
      activeButton.classList.remove('img-filters__button--active');
      button.classList.add('img-filters__button--active');
      debouncedApplyFilter(filterType);
    });
  };

  window.imgFilters = {
    filterForm: imgFilters,
    bindFilters: bindFilters,
  };

})();
