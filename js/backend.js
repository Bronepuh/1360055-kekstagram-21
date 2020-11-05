'use strict';
(function () {
  const StatusCode = {
    OK: 200
  };

  const TIMEOUT_IN_MS = 10000;

  const load = function (onSuccess, onError) {
    const URL = 'https://21.javascript.pages.academy/kekstagram/data';

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.send();
  };

  const save = function (data, onSuccess, onError) {
    const URL = 'https://21.javascript.pages.academy/kekstagram';
    const xhr = new XMLHttpRequest();

    xhr.open('POST', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess();
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  };
})();
