"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatterDiscount = formatterDiscount;
exports.formatterEuro = formatterEuro;
exports.formatterEuroToD3 = formatterEuroToD3;
var _lodash = require("lodash");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function formatterDiscount(discount) {
  var clonedDiscount = (0, _lodash.cloneDeep)(discount);
  var formatterWithEuro = "".concat(formatterEuro(clonedDiscount));
  var newPercent = formatterWithEuro.substring(0, formatterWithEuro.length - 1);
  return "".concat(newPercent, "%");
}
function formatterEuro(priceToFormatter) {
  // Asegúrate de que el precio sea un número
  if (typeof priceToFormatter !== "number" || isNaN(priceToFormatter)) {
    // throw new Error("El precio debe ser un número válido.");
    return "0,00 €";
  }

  // Redondear el número al segundo decimal
  var roundedPrice = Math.round(priceToFormatter * 100) / 100;

  // Convertir el número redondeado a una cadena con dos decimales
  var priceString = roundedPrice.toFixed(2);

  // Obtener la parte entera y los decimales
  var _priceString$split = priceString.split("."),
    _priceString$split2 = _slicedToArray(_priceString$split, 2),
    integerPart = _priceString$split2[0],
    decimalPart = _priceString$split2[1];

  // Si el decimalPart es undefined o vacío, establecerlo como '00'
  var paddedDecimalPart = decimalPart.padEnd(2, "0");

  // Concatenar la parte entera y los decimales
  var formattedPrice = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + paddedDecimalPart;
  return formattedPrice + " €";
}
function formatterEuroToD3(priceToFormatter) {
  // Asegurarse de que el precio sea un número entero
  if (!Number.isInteger(priceToFormatter) && !Number(priceToFormatter)) {
    return "0 €";
  }

  // Convertir el número a una cadena
  var priceString = priceToFormatter.toString();

  // Obtener la parte entera
  var integerPart = priceString;

  // Concatenar la parte entera
  var formattedPrice = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return formattedPrice + " €";
}