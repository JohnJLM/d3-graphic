"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var d3 = _interopRequireWildcard(require("d3"));
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _formatNumber = require("../utils/format-number");
var _CircleAnimation = _interopRequireDefault(require("./CircleAnimation"));
var _colors = require("./colors");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var PieChart = function PieChart(_ref) {
  var data = _ref.data,
    keyLabel = _ref.keyLabel,
    keyValue = _ref.keyValue,
    loading = _ref.loading,
    error = _ref.error,
    primaryKey = _ref.primaryKey,
    _ref$colors = _ref.colors,
    colors = _ref$colors === void 0 ? _colors.defaultColors : _ref$colors,
    _ref$withoutDataMessa = _ref.withoutDataMessage,
    withoutDataMessage = _ref$withoutDataMessa === void 0 ? "Without Data" : _ref$withoutDataMessa;
  var _useState = (0, _react.useState)({
      width: 0,
      height: 0
    }),
    _useState2 = _slicedToArray(_useState, 2),
    sizes = _useState2[0],
    setSizes = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    clonedData = _useState4[0],
    setClonedData = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isModalVisible = _useState6[0],
    setIsModalVisible = _useState6[1];
  var svgRef = (0, _react.useRef)(null);
  var _useState7 = (0, _react.useState)(1),
    _useState8 = _slicedToArray(_useState7, 2),
    animateKey = _useState8[0],
    setAnimateKey = _useState8[1];
  var scrollViewRef = (0, _react.useRef)(null);
  var _useState9 = (0, _react.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    svgRendered = _useState10[0],
    setSvgRendered = _useState10[1];
  (0, _react.useEffect)(function () {
    if (data && data.length) {
      var cloned = combineDataByPrimaryKey(data, primaryKey, keyValue);
      setClonedData(cloned);
    }
  }, [data]);
  (0, _react.useEffect)(function () {
    if (svgRendered) {
      var scrollView = scrollViewRef.current;
      if (scrollView) {
        scrollView.scrollTo({
          y: 0,
          animated: true
        });
        setAnimateKey(animateKey + 1);
      }
    }
  }, [svgRendered, clonedData]);
  var combineDataByPrimaryKey = function combineDataByPrimaryKey(data, primaryKey, keyValue) {
    var combinedData = data.reduce(function (acc, item) {
      var existingItem = acc.find(function (d) {
        return d[primaryKey] === item[primaryKey];
      });
      if (existingItem) {
        existingItem[keyValue] += item[keyValue];
      } else {
        acc.push(_objectSpread({}, item));
      }
      return acc;
    }, []);
    return combinedData;
  };
  var onLayout = function onLayout(event) {
    var _event$nativeEvent$la = event.nativeEvent.layout,
      width = _event$nativeEvent$la.width,
      height = _event$nativeEvent$la.height;
    setSizes({
      width: width,
      height: height
    });
    setSvgRendered(true);
  };
  var radius = Math.min(sizes.width, sizes.height) / 2;
  var pie = d3.pie().value(function (d) {
    return d[keyValue];
  })(clonedData || []);
  var arc = d3.arc().innerRadius(0).outerRadius(radius);
  var labelArc = d3.arc().innerRadius(radius - 40).outerRadius(radius - 40);
  var totalValue = clonedData ? d3.sum(clonedData, function (d) {
    return d[keyValue];
  }) : null;
  var toggleModal = function toggleModal() {
    setIsModalVisible(!isModalVisible);
  };
  var circleTop = sizes.height / 2 - radius;
  var circleLeft = sizes.width / 2 - radius;
  return /*#__PURE__*/_react["default"].createElement(_reactNative.View, {
    style: styles.container,
    onLayout: onLayout
  }, loading && /*#__PURE__*/_react["default"].createElement(_reactNative.ActivityIndicator, {
    style: styles.loading,
    size: "large",
    color: "#c1c1c1"
  }), error && /*#__PURE__*/_react["default"].createElement(_reactNative.Text, {
    style: styles.error
  }, withoutDataMessage), /*#__PURE__*/_react["default"].createElement(_reactNative.TouchableOpacity, {
    style: styles.button,
    onPress: toggleModal
  }, /*#__PURE__*/_react["default"].createElement(_reactNative.Text, {
    style: styles.buttonText
  }, "Show Legend")), /*#__PURE__*/_react["default"].createElement(_reactNative.ScrollView, {
    ref: scrollViewRef,
    nestedScrollEnabled: _reactNative.Platform.OS === "android",
    showsVerticalScrollIndicator: true,
    persistentScrollbar: true
  }, /*#__PURE__*/_react["default"].createElement(_reactNative.View, {
    style: [styles.chartContainer, {
      width: sizes.width || "100%",
      height: sizes.height || "100%"
    }]
  }, clonedData && /*#__PURE__*/_react["default"].createElement(_reactNativeSvg["default"], {
    ref: svgRef,
    width: sizes.width,
    height: sizes.height
  }, /*#__PURE__*/_react["default"].createElement(_reactNativeSvg.G, {
    transform: "translate(".concat(sizes.width / 2, ",").concat(sizes.height / 2, ")")
  }, /*#__PURE__*/_react["default"].createElement(_reactNativeSvg.Circle, {
    cx: 0,
    cy: 0,
    r: radius * 0.4,
    fill: "none",
    stroke: "#fff",
    strokeWidth: 2
  }), pie.map(function (d, i) {
    var percentage = d.value / totalValue * 100;
    return /*#__PURE__*/_react["default"].createElement(_reactNativeSvg.G, {
      key: i
    }, /*#__PURE__*/_react["default"].createElement(_reactNativeSvg.Path, {
      d: arc(d),
      fill: colors[i % colors.length]
    }), percentage > 8 && /*#__PURE__*/_react["default"].createElement(_reactNativeSvg.Text, {
      transform: "translate(".concat(labelArc.centroid(d), ")"),
      dy: ".35em",
      textAnchor: "middle",
      fontSize: 11,
      fontWeight: "bold",
      fill: "#fff"
    }, "".concat(percentage.toFixed(2), "%")));
  }))), clonedData && /*#__PURE__*/_react["default"].createElement(_CircleAnimation["default"], {
    radius: radius,
    top: circleTop,
    left: circleLeft,
    color: "#fff",
    key: animateKey
  }))), /*#__PURE__*/_react["default"].createElement(_reactNative.Modal, {
    animationType: "slide",
    transparent: true,
    visible: isModalVisible,
    onRequestClose: toggleModal
  }, /*#__PURE__*/_react["default"].createElement(_reactNative.View, {
    style: styles.modalContainer
  }, /*#__PURE__*/_react["default"].createElement(_reactNative.View, {
    style: styles.modalContent
  }, /*#__PURE__*/_react["default"].createElement(_reactNative.TouchableOpacity, {
    onPress: toggleModal,
    style: styles.closeButton
  }, /*#__PURE__*/_react["default"].createElement(_reactNative.Text, {
    style: styles.closeButtonText
  }, "Close")), /*#__PURE__*/_react["default"].createElement(_reactNative.ScrollView, null, clonedData && clonedData.map(function (item, index) {
    return /*#__PURE__*/_react["default"].createElement(_reactNative.View, {
      key: index,
      style: styles.legendItem
    }, /*#__PURE__*/_react["default"].createElement(_reactNative.View, {
      style: [styles.colorBox, {
        backgroundColor: colors[index % colors.length]
      }]
    }), /*#__PURE__*/_react["default"].createElement(_reactNative.Text, {
      style: styles.legendText
    }, item[keyLabel], ": ", (0, _formatNumber.formatterEuro)(item[keyValue])));
  }))))));
};
var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "75%"
  },
  chartContainer: {
    position: "relative"
  },
  loading: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  error: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "red"
  },
  button: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 5,
    zIndex: 10
  },
  buttonText: {
    fontSize: 11,
    color: "#fff",
    fontWeight: "bold"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxHeight: "70%"
  },
  closeButton: {
    alignSelf: "flex-end"
  },
  closeButtonText: {
    color: "#007bff",
    fontWeight: "bold",
    fontSize: 16
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  legendText: {
    fontSize: 16
  }
});
var _default = exports["default"] = PieChart;