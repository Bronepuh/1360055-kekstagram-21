'use strict';

(function () {
  // module4-task1
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
    window.gallery.body.classList.add('modal-open');
    document.addEventListener('keydown', onUploadPopupEscPress);
  };

  const closeUploadPopup = function () {
    imgUploadOverlay.classList.add('hidden');
    window.gallery.body.classList.remove('modal-open');
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
    imgUploadPreview.style = 'transform: scale(' + getNumberOfInput() / 100 + ')';
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

  // наложение эффекта на изображение
  const effectList = window.form.uploadForm.querySelector('.effects__list');
  const uploadEffectLevel = window.form.uploadForm.querySelector('.img-upload__effect-level');
  const effectLevelLine = uploadEffectLevel.querySelector('.effect-level__line');
  const effectLevelPin = uploadEffectLevel.querySelector('.effect-level__pin');
  const effectLevelDepth = uploadEffectLevel.querySelector('.effect-level__depth');

  const MAX_BLUR_VALUE = 4;
  const MAX_BRIGHTNESS_VALUE = 3;


  const setEffect = function (effect, value) {
    imgUploadPreview.className = '';
    imgUploadPreview.classList.add('effects__preview--' + effect);

    switch (effect) {
      case 'chrome':
        imgUploadPreview.style = "filter: grayscale(" + value + ")";
        break;
      case 'sepia':
        imgUploadPreview.style = "filter: sepia(" + value + ")";
        break;
      case 'marvin':
        imgUploadPreview.style = "filter: invert(" + (value * 100) + "%)";
        break;
      case 'phobos':
        imgUploadPreview.style = "filter: blur(" + value * MAX_BLUR_VALUE + "px)";
        break;
      case 'heat':
        imgUploadPreview.style = "filter: brightness(" + value * MAX_BRIGHTNESS_VALUE + ")";
        break;
      default:
        imgUploadPreview.style = "";
        break;
    }
  };

  let currentEffect = 'none';

  const onChangeEffect = function (evt) {
    let effect = evt.target.value;

    if (effect === 'none') {
      uploadEffectLevel.classList.add('hidden');
    } else {
      uploadEffectLevel.classList.remove('hidden');
    }

    effectLevelPin.style = "left: " + 100 + "%";
    effectLevelDepth.style = "width: " + 100 + "%";

    currentEffect = effect;

    setEffect(effect, 1);
  };

  effectList.addEventListener('change', function (evt) {
    onChangeEffect(evt);
  });

  const getEffectValue = function () {
    const lineWidthInPx = 452;

    effectLevelLine.addEventListener('mouseup', function (evt) {
      effectLevelPin.blur();
      effectLevelLine.focus();
      const currentEffectValue = evt.offsetX / lineWidthInPx;
      effectLevelPin.style = "left: " + Math.floor(currentEffectValue * 100) + "%";
      effectLevelDepth.style = "width: " + Math.floor(currentEffectValue * 100) + "%";
      setEffect(currentEffect, currentEffectValue);
    });
  };

  effectLevelPin.addEventListener('focus', function () {
    getEffectValue();
    effectLevelPin.blur();
    effectLevelLine.focus();
  });

  effectLevelPin.removeEventListener('blur', getEffectValue);

  effectLevelLine.addEventListener('click', function () {
    getEffectValue();
  });

  effectLevelLine.removeEventListener('blur', getEffectValue);

  window.preview = {
    show: openUploadPopup,
    onUploadPopupEscPress: onUploadPopupEscPress,
  };
})();
