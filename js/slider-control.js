'use strict';

(function () {
  // ползунок

  const uploadEffectLevel = window.form.uploadForm.querySelector('.img-upload__effect-level');
  const effectLevelLine = uploadEffectLevel.querySelector('.effect-level__line');
  const effectLevelPin = uploadEffectLevel.querySelector('.effect-level__pin');
  const effectLevelDepth = uploadEffectLevel.querySelector('.effect-level__depth');

  const MIN_SLIDER_VALUE = 0;

  const sliderControl = function (downEvt) {
    downEvt.preventDefault();

    let startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const sliderValue = effectLevelPin.offsetLeft - shift.x;

      effectLevelPin.style.left = sliderValue + 'px';
      effectLevelDepth.style.width = effectLevelPin.style.left;

      if (sliderValue <= MIN_SLIDER_VALUE) {
        effectLevelPin.style.left = 0 + 'px';
      } else if (sliderValue >= effectLevelLine.clientWidth) {
        effectLevelPin.style.left = effectLevelLine.clientWidth + 'px';
      }

      const currentEffectValue = effectLevelPin.offsetLeft / effectLevelLine.clientWidth;

      setEffect(currentEffect, currentEffectValue);

    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  effectLevelPin.addEventListener('mousedown', sliderControl);

  // наложение эффекта на изображение

  const imgUploadPreview = window.form.uploadForm.querySelector('.img-upload__preview img');
  const effectList = window.form.uploadForm.querySelector('.effects__list');

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

})();


// slider.js
// window.slider = {
// setCallback: function(callback) {
// callback(currentEffectValue);
// }

// apply-effect.js
// const setEffect = function(effect) {
// return function(effectValue) {
// applyFilter(effect, effectValue);
// }
// const callback = setEffect(newFilter);
// window.slider.init(callback);
// }
