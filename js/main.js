'use strict';
(function () {

  window.form.uploadForm.addEventListener('submit', function (evt) {
    window.xhr.save(new FormData(window.form.uploadForm),
        function () {
          window.preview.hidden();
          window.form.resetValues();
          window.form.uploadForm.reset();
          window.form.createSuccessMessage();
        },
        function (message) {
          window.preview.hidden();
          window.form.resetValues();
          window.form.uploadForm.reset();
          window.form.createErrorMessage(message);
        }
    );
    evt.preventDefault();
  });

  window.xhr.load(function (clientData) {
    window.gallery.render(clientData);
  });

})();
