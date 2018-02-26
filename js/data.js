'use strict';
(function () {
  // создаём объект с типами квартир
  var HOUSE_TYPES = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
    'palace': 'Дворец'
  };

  var flats = [];

  var checkInCheckOut = ['12:00', '13:00', '14:00'];

  var errorHandler = function (message) {
    var el = document.createElement('DIV');
    el.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: white; font-size: 20px; position: fixed; left: 0; top: 0; width: 100%; padding: 10px;';
    el.textContent = 'Ошибка отправки формы: ' + message;
    document.body.insertAdjacentHTML('afterbegin', el);
  };

  var getOffersFromServer = function (callback) {
    window.backend.load(function (data) {
      window.data.flats = data;
      if (callback !== 'undefined') {
        callback();
      }
    }, function (message) {
      errorHandler(message);
    });
  };

  window.data = {
    getOffersFromServer: getOffersFromServer,
    flats: flats,
    HOUSE_TYPES: HOUSE_TYPES,
    checkInCheckOut: checkInCheckOut
  };
})();
