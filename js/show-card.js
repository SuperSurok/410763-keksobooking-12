'use strict';
(function () {

  var ESC_BUTTON = 27;
  var ENTER_BUTTON = 13;

  var OFFER_TEMPLATE = document.querySelector('template').content;

  // скрываем карточки
  var pinPopupClickHandler = function () {
    var popups = document.querySelectorAll('.map__card.popup');

    var popupClose = document.querySelector('.popup__close');
    for (var i = 0; i < popups.length; i++) {
      var popup = popups[i];
      popupClose.addEventListener('click', pinPopupClickHandler);
      popupClose.addEventListener('keydown', popupCloseEnterHandler);
      popup.remove();
    }
    window.pin.makeActive(document.querySelectorAll('.map__pin.map__pin--active'), false);

    document.removeEventListener('keydown', popupCloseEscapeHandler);
  };


  // удаляем карточку по нажатию ESCAPE
  var popupCloseEscapeHandler = function (keyDownEvt) {
    if (keyDownEvt.keyCode === ESC_BUTTON) {
      pinPopupClickHandler();
    }
  };

  // удаляем карточку по нажатию на ENTER
  var popupCloseEnterHandler = function (keyDownEvt) {
    if (document.activeElement === keyDownEvt.target && keyDownEvt.keyCode === ENTER_BUTTON) {
      pinPopupClickHandler();
    }
  };

  // отображаем метки и карточки квартир на экране
  var showCard = function (offer) {
    // генерация карточки
    var offerElement = OFFER_TEMPLATE.querySelector('article.map__card').cloneNode(true);

    offerElement.innerHTML = window.card.renderCardHouse(offer, offerElement);
    offerElement.innerHTML = window.card.paintPictures(offer, offerElement);
    offerElement.style.top = '80px';
    offerElement.style.width = '300px';

    // добавить в дом элемент карточки с данными
    var mapPins = document.querySelector('.map__pins');
    mapPins.insertAdjacentHTML('afterend', offerElement.outerHTML);


    var popupClose = document.querySelector('.popup__close');

    // повесить бинды
    popupClose.addEventListener('click', pinPopupClickHandler);
    document.addEventListener('keydown', popupCloseEscapeHandler);
    popupClose.addEventListener('keydown', popupCloseEnterHandler);
  };

  window.showCard = {
    showCard: showCard,
    pinPopupClickHandler: pinPopupClickHandler
  };
})();
