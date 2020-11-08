'use strict';

(function () {
  // открытие и закрытие окна для редактирования загружаемой фотографии
  const uploadFileInput = window.form.uploadForm.querySelector('#upload-file');
  const imgUploadOverlay = window.form.uploadForm.querySelector('.img-upload__overlay');
  const imgUploadOverlayCancel = imgUploadOverlay.querySelector('.img-upload__cancel');

  const onUploadPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      uploadFileInput.value = '';
      closeUploadPopup();
    }
  };

  const openUploadPopup = function () {
    imgUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onUploadPopupEscPress);
  };

  const closeUploadPopup = function () {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onUploadPopupEscPress);
  };

  imgUploadOverlayCancel.addEventListener('click', function () {
    closeUploadPopup();
  });

  // Изменение размера изображения
  const MIN_VALUE = 0;
  const MAX_VALUE = 100;
  const STEP = 25;
  const imgUploadScaleContol = window.form.uploadForm.querySelector('.img-upload__scale');
  const controlSmaller = imgUploadScaleContol.querySelector('.scale__control--smaller');
  const controlBigger = imgUploadScaleContol.querySelector('.scale__control--bigger');
  const controlInput = imgUploadScaleContol.querySelector('.scale__control--value');
  const imgUploadPreview = window.form.uploadForm.querySelector('.img-upload__preview img');

  const getNumberOfInput = function () {
    let number = parseInt(controlInput.value, 10);
    return number;
  };

  const changeSizePreview = function () {
    imgUploadPreview.style = 'transform: scale(' + getNumberOfInput() / MAX_VALUE + ')';
  };

  const pushControlSmaller = function (value = MIN_VALUE) {
    let number = getNumberOfInput();
    if (number > value) {
      controlInput.value = String((number - STEP) + '%');
      changeSizePreview();
    }
    return controlInput.value;
  };

  const pushControlBigger = function (value = MAX_VALUE) {
    let number = getNumberOfInput();
    if (number < value) {
      controlInput.value = String((number + STEP) + '%');
      changeSizePreview();
    }
    return controlInput.value;
  };

  controlSmaller.addEventListener('click', function () {
    pushControlSmaller();
  });

  controlBigger.addEventListener('click', function () {
    pushControlBigger();
  });

  window.preview = {
    show: openUploadPopup,
    hidden: closeUploadPopup,
    onUploadPopupEscPress: onUploadPopupEscPress,
  };
})();
