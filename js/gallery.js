'use strict';
(function () {
  const pictureList = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const uploadFileInput = window.form.uploadForm.querySelector('#upload-file');

  const renderPhoto = function (picture) {
    let pictureSimularItem = pictureTemplate.cloneNode(true);
    pictureSimularItem.querySelector('.picture__img').src = picture.url;
    pictureSimularItem.querySelector('.picture__likes').textContent = picture.likes;
    pictureSimularItem.querySelector('.picture__comments').textContent = picture.comments.length;

    const onBigPictureEnterPress = function (evt) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        window.picture.show(picture);
      }
    };

    pictureSimularItem.querySelector('.picture__img').addEventListener('click', function () {
      window.picture.show(picture);
    });

    pictureSimularItem.querySelector('p').addEventListener('click', function () {
      window.picture.show(picture);
    });

    pictureSimularItem.addEventListener('keydown', onBigPictureEnterPress);

    return pictureSimularItem;
  };

  const renderPhotos = function (pictures) {
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPhoto(pictures[i]));
    }
    pictureList.appendChild(fragment);
  };

  const render = function (pictures) {
    renderPhotos(pictures);
    uploadFileInput.addEventListener('change', function () {
      window.preview.show();
    });
  };

  window.gallery = {
    render: render,
  };
})();
