'use strict';
(function () {

  window.form.uploadForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(window.form.uploadForm),
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

  window.backend.load(function (clientData) {
    window.gallery.render(clientData);
    window.imgFilters.filterForm.classList.remove('img-filters--inactive');
    window.imgFilters.bindFilters(clientData);
  });
})();
