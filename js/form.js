'use strict';

(function () {
  // хэш-теги и текстареа
  const MIN_HASHTAG_LENGTH = 2;
  const MAX_HASHTAG_LENGTH = 20;
  const imgUploadForm = document.querySelector('.img-upload__form');
  const imgUploadText = imgUploadForm.querySelector('.img-upload__text');
  const textHashtags = imgUploadText.querySelector('.text__hashtags');
  const imgUploadDescription = imgUploadText.querySelector('.text__description');

  const main = document.querySelector('main');
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');

  textHashtags.addEventListener('input', function () {
    const inputValue = textHashtags.value;
    const tagsArr = inputValue.split(' ');


    const hasDuplicates = function (items) {
      let unicItems = [];
      for (let i = 0; i < items.length; i++) {
        let el = items[i];
        if (unicItems.includes(el)) {
          return true;
        }
        unicItems.push(el);
      }
      return false;
    };

    const checkValidationInput = function (arr) {
      for (let i = 0; i < arr.length; i++) {
        let tag = arr[i];
        let tagHatchback = tag.substring(1, tag.length);
        if (tag[0] !== '#') {
          textHashtags.setCustomValidity('ХэшТеги должны начинаться с "#"');
        } else if (tagHatchback.includes('#') || tagHatchback.includes('@') || tagHatchback.includes('$') || tagHatchback.includes('<') || tagHatchback.includes('>') || tagHatchback.includes('%') || tagHatchback.includes('.') || tagHatchback.includes('!') || tagHatchback.includes('?') || tagHatchback.includes('"') || tagHatchback.includes('\'') || tagHatchback.includes('&') || tagHatchback.includes('|') || tagHatchback.includes('\\') || tagHatchback.includes('§') || tagHatchback.includes('¶') || tagHatchback.includes('+') || tagHatchback.includes('-') || tagHatchback.includes('=') || tagHatchback.includes('*') || tagHatchback.includes('/')) {
          textHashtags.setCustomValidity('ХэшТеги не должны содержать спецсимволы (#, @, $ и т. п.), знаки пунктуации, эмодзи и т.п.');
        } else if (tag.length < MIN_HASHTAG_LENGTH) {
          textHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
        } else if (tag.length > MAX_HASHTAG_LENGTH) {
          textHashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
        } else if (hasDuplicates(arr)) {
          textHashtags.setCustomValidity('хэштеги не должны повторяться');
        } else if (inputValue.includes(',')) {
          textHashtags.setCustomValidity('ХэшТеги должны разделяться пробелом, а не ","');
        } else {
          textHashtags.setCustomValidity('');
        }
      }
    };

    checkValidationInput(tagsArr);
  });

  textHashtags.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.preview.onUploadPopupEscPress);
  });

  textHashtags.addEventListener('blur', function () {
    document.addEventListener('keydown', window.preview.onUploadPopupEscPress);
  });

  imgUploadDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.preview.onUploadPopupEscPress);
  });

  imgUploadDescription.addEventListener('blur', function () {
    document.addEventListener('keydown', window.preview.onUploadPopupEscPress);
  });

  const createSuccessMessage = function () {
    let successSimularItem = successTemplate.cloneNode(true);

    document.body.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        successSimularItem.remove();
      }
    });
    document.body.addEventListener('click', function () {
      successSimularItem.remove();
    });
    main.append(successSimularItem);
  };

  const createErrorMessage = function (message) {
    let errorSimularItem = errorTemplate.cloneNode(true);
    errorSimularItem.querySelector('.error__title').textContent = message;

    document.body.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        errorSimularItem.remove();
      }
    });
    document.body.addEventListener('click', function () {
      errorSimularItem.remove();
    });
    main.append(errorSimularItem);
  };

  const resetValues = function () {
    textHashtags.value = '';
    imgUploadDescription.value = '';
  };

  window.form = {
    uploadForm: imgUploadForm,
    resetValues: resetValues,
    createSuccessMessage: createSuccessMessage,
    createErrorMessage: createErrorMessage,
  };
})();
