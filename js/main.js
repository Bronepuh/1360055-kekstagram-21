'use strict';
(function () {
  const main = document.querySelector('main');
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const textHashtags = document.querySelector('.text__hashtags');
  const imgUploadDescription = document.querySelector('.text__description');

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

  const createErrorMessage = function () {
    let errorSimularItem = errorTemplate.cloneNode(true);

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

  window.form.uploadForm.addEventListener('submit', function (evt) {
    window.xhr.save(new FormData(window.form.uploadForm),
        function () {
          window.preview.hidden();
          textHashtags.value = '';
          imgUploadDescription.value = '';
          createSuccessMessage();
        },
        function () {
          // console.log('на этом наши полномочия всё...');
          window.preview.hidden();
          textHashtags.value = '';
          imgUploadDescription.value = '';
          createErrorMessage();
        }
    );
    evt.preventDefault();
  });

  window.xhr.load(function (clientData) {
    window.gallery.render(clientData);
  });

})();
