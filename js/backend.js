'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var CODE_SUCCESS = 200;
  var TIME_OUT = 4000;

  var init = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIME_OUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError('Error ' + xhr.status);
      }
    });

    xhr.addEventListener('timeout', function () {
      onError('Запорс не выполнился за ' + xhr.timeout + 'мс');
    });
    return xhr;
  };

  // отправить на сервер
  var upLoad = function (data, onLoad, onError) {
    var xhr = init(onLoad, onError);
    xhr.open('POST', URL);
    xhr.send(data);
  };

  // получение данных с сервера
  var load = function (onLoad, onError) {
    var xhr = init(onLoad, onError);
    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  window.backend = {
    upLoad: upLoad,
    load: load
  };
})();
