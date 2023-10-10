"use strict";

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('submit').addEventListener('click', doSubmit);
});

function doSubmit() {
  setHtmlAll('.error', '');
  setHtmlAll('.valid', '');
  processAmount();
  processName();
  processCardNumber();
  processExpiryDate();
  processCvv();
}

function processAmount() {
  var amountStr = getValue('#amount');
  var amount = Number.parseFloat(amountStr);

  if (Number.isNaN(amount)) {
    setHtml('#amountError', 'Сумма ОБЯЗАТЕЛЬНО');
    return;
  }

  var amountPennies = Math.trunc(amount * 100);
  setHtml('#amountValid', "Сумма в копейках: ".concat(amountPennies));
}

function processName() {
  var name = getValue('#name');

  if (name.length == 0) {
    setHtml('#nameError', 'Имя ОБЯЗАТЕЛЬНО');
    return;
  }

  setHtml('#nameValid', name.toUpperCase());
}

function processCardNumber() {
  var cardNumber = getValue('#cardNumber');
  cardNumber = cardNumber.replace(/-|\s|\./g, '');

  if (cardNumber.length != 16) {
    setHtml('#cardNumberError', 'Должно быть 16 цифр');
    return;
  }

  var matches = cardNumber.match(/\d{4}/g);

  if (matches == null || matches.length != 4) {
    setHtml('#cardNumberError', 'Должно быть 16 цифр');
    return;
  }

  if (!cardNumber.startsWith('2') && !cardNumber.startsWith('4') && !cardNumber.startsWith('5')) {
    setHtml('#cardNumberError', 'Первая цифра должна быть 2, 4 или 5');
    return;
  }

  setHtml('#cardNumberValid', "".concat(matches[0], "-").concat(matches[1], "-").concat(matches[2], "-").concat(matches[3]));
}

function processExpiryDate() {
  var expiryDate = getValue('#expiryDate');

  if (expiryDate.length != 4) {
    setHtml('#expiryDateError', '4 цифры слитно');
    return;
  }

  var matches = expiryDate.match(/\d{2}/g);

  if (matches == null || matches.length != 2) {
    setHtml('#expiryDateError', 'Месяц и год указываются слитно');
    return;
  }

  var month = Number.parseInt(matches[0]);
  var year = Number.parseInt(matches[1]);

  if (month < 1 || month > 12) {
    setHtml('#expiryDateError', 'Неверно указан месяц');
    return;
  }

  if (year < 23 || year > 33) {
    setHtml('#expiryDateError', 'Неверно указан год');
    return;
  }

  setHtml('#expiryDateValid', "Месяц ".concat(month, ", год ").concat(year));
}

function processCvv() {
  var cvv = getValue('#cvv');

  if (cvv.search(/^\d{3}$/) == -1) {
    setHtml('#cvvError', 'Должно быть 3 цифры');
    return;
  }

  setHtml('#cvvValid', cvv);
}
/* Helper functions */


function getValue(selector) {
  var element = document.querySelector(selector);
  return element ? element.value : '';
}

function setHtml(selector, html) {
  var element = document.querySelector(selector);

  if (element) {
    element.innerHTML = html;
  }
}

function setHtmlAll(selector, html) {
  var elements = document.querySelectorAll(selector);
  elements.forEach(function (e) {
    return e.innerHTML = html;
  });
}
//# sourceMappingURL=script.js.map
