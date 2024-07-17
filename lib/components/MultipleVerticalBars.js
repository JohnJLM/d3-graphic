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
var _CurtainToAnimate = _interopRequireDefault(require("./CurtainToAnimate"));
var _colors = require("./colors");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var MultipleVerticalBars = function MultipleVerticalBars(_ref) {
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
  // Animation
  var svgRef = (0, _react.useRef)(null);
  var _useState5 = (0, _react.useState)(1),
    _useState6 = _slicedToArray(_useState5, 2),
    animateKey = _useState6[0],
    setAnimateKey = _useState6[1];
  var scrollViewRef = (0, _react.useRef)(null);
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    svgRendered = _useState8[0],
    setSvgRendered = _useState8[1];
  // Tooltip
  var _useState9 = (0, _react.useState)(null),
    _useState10 = _slicedToArray(_useState9, 2),
    selectedBar = _useState10[0],
    setSelectedBar = _useState10[1];
  var _useState11 = (0, _react.useState)({
      visible: false,
      value: 0,
      x: 0,
      y: 0
    }),
    _useState12 = _slicedToArray(_useState11, 2),
    tooltip = _useState12[0],
    setTooltip = _useState12[1];
  var handleContainerPress = function handleContainerPress() {
    if (selectedBar !== null) {
      setTooltip({
        visible: false,
        value: null,
        x: null,
        y: null
      });
      setSelectedBar(null);
    } else if (tooltip.visible) {
      setTooltip({
        visible: false,
        value: null,
        x: null,
        y: null
      });
      setSelectedBar(null);
    }
  };
  (0, _react.useEffect)(function () {
    if (data) {
      var cloned = filterByTopTen(data, keyValue);
      setClonedData(cloned);
      handleContainerPress();
    }
  }, [data]);

  // Animation
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
  var filterByTopTen = function filterByTopTen(data, keyValue) {
    return data.sort(function (a, b) {
      return b[keyValue] - a[keyValue];
    });
  };
  var onLayout = function onLayout(event) {
    var _event$nativeEvent$la = event.nativeEvent.layout,
      width = _event$nativeEvent$la.width,
      height = _event$nativeEvent$la.height;
    setSizes({
      width: width,
      height: height
    });
    setSvgRendered(true); // Mark SVG as rendered
  };
  var margin = {
    top: 35,
    right: 25,
    bottom: 45,
    left: 75
  };
  var height = sizes.height - margin.top - margin.bottom;
  var barWidth = 22.6;
  var barSpacing = 10;
  var width = clonedData ? clonedData.length * (barWidth + barSpacing) - barSpacing : 0;
  var containerWidth = Math.max(width + margin.left + margin.right, sizes.width);
  var fontSizeTooltip = 15;
  var xScale = null;
  var yScale = null;
  if (clonedData) {
    var maxValue = d3.max(clonedData, function (d) {
      return d[keyValue];
    });
    yScale = d3.scaleLinear().domain([0, maxValue]).range([height, 0]);
    xScale = d3.scaleBand().domain(clonedData.map(function (d) {
      return d[primaryKey];
    })).range([0, width]).paddingInner(0.1).paddingOuter(0.1);
  }
  var handleBarPress = function handleBarPress(value, x, primaryKey) {
    setSelectedBar(primaryKey);
    setTooltip({
      visible: true,
      value: value,
      x: x,
      y: height / 2
    });
  };

  // Helper function to truncate text with ellipsis
  var truncateText = function truncateText(text, maxWidth) {
    if ((text === null || text === void 0 ? void 0 : text.length) * 3 <= maxWidth) return text;
    return text.substring(0, Math.floor(maxWidth / 3.5) - 3) + "...";
  };
  var calculateTooltipWidth = function calculateTooltipWidth(text) {
    return text.length * (fontSizeTooltip * 0.5);
  };
  return /*#__PURE__*/_react["default"].createElement(_reactNative.View, {
    style: styles.container,
    onLayout: onLayout
  }, loading && /*#__PURE__*/_react["default"].createElement(_reactNative.ActivityIndicator, {
    style: styles.loading,
    size: "large",
    color: "#c1c1c1"
  }), error && /*#__PURE__*/_react["default"].createElement(_reactNative.Text, {
    style: styles.error
  }, withoutDataMessage), /*#__PURE__*/_react["default"].createElement(_reactNative.ScrollView, {
    ref: scrollViewRef,
    horizontal: true,
    nestedScrollEnabled: _reactNative.Platform.OS === "android" // only for Android
    ,
    showsHorizontalScrollIndicator: true,
    persistentScrollbar: true
  }, /*#__PURE__*/_react["default"].createElement(_reactNative.View, {
    style: [styles.chartContainer, {
      width: containerWidth,
      height: sizes.height
    }]
  }, clonedData && /*#__PURE__*/_react["default"].createElement(_CurtainToAnimate["default"], {
    height: height,
    style: [styles.curtain, {
      width: width + 40
    }],
    key: animateKey
  }), xScale && /*#__PURE__*/_react["default"].createElement(_reactNativeSvg["default"], {
    ref: svgRef,
    width: containerWidth,
    height: sizes.height,
    onPress: handleContainerPress
  }, /*#__PURE__*/_react["default"].createElement(_reactNativeSvg.G, {
    transform: "translate(".concat(margin.left, ",").concat(margin.top, ")")
  }, /*#__PURE__*/_react["default"].createElement(_reactNativeSvg.G, {
    transform: "translate(0, ".concat(height, ")")
  }, /*#__PURE__*/_react["default"].createElement(_reactNativeSvg.Line, {
    x1: 0,
    x2: width,
    stroke: "black"
  }), clonedData.map(function (row, i) {
    return /*#__PURE__*/_react["default"].createElement(_reactNativeSvg.G, {
      key: i,
      transform: "translate(".concat(xScale(row[primaryKey]) + xScale.bandwidth() / 2, ", 0)")
    }, /*#__PURE__*/_react["default"].createElement(_reactNativeSvg.Line, {
      y1: 0,
      y2: 10,
      stroke: "black"
    }), /*#__PURE__*/_react["default"].createElement(_reactNativeSvg.Text, {
      dy: "1.75em",
      textAnchor: "end",
      fontSize: 11,
      fontWeight: "bold",
      transform: "rotate(-45)"
    }, row[keyLabel] ? truncateText(row[keyLabel], xScale.bandwidth()) : ""));
  })), clonedData.map(function (row, i) {
    return /*#__PURE__*/_react["default"].createElement(_reactNativeSvg.G, {
      key: i
    }, /*#__PURE__*/_react["default"].createElement(_reactNativeSvg.Rect, {
      key: i,
      x: xScale(row[primaryKey]),
      y: yScale(row[keyValue]),
      width: barWidth,
      height: height - yScale(row[keyValue]) - 3,
      fill: selectedBar === row[primaryKey] ? "#ad234f" : colors[i % colors.length],
      rx: 5,
      ry: 5,
      onPress: function onPress() {
        var _row$keyLabel;
        return handleBarPress("".concat((_row$keyLabel = row[keyLabel]) !== null && _row$keyLabel !== void 0 ? _row$keyLabel : "", " : ").concat((0, _formatNumber.formatterEuro)(row[keyValue])), xScale(row[primaryKey]), row[primaryKey]);
      }
    }));
  }), tooltip.visible && /*#__PURE__*/_react["default"].createElement(_reactNativeSvg.G, null, /*#__PURE__*/_react["default"].createElement(_reactNativeSvg.Rect, {
    x: tooltip.x,
    y: tooltip.y,
    width: calculateTooltipWidth(tooltip.value),
    height: 35,
    fill: "white",
    stroke: "gray",
    strokeWidth: 1,
    rx: 5,
    ry: 5
  }), /*#__PURE__*/_react["default"].createElement(_reactNativeSvg.Text, {
    x: tooltip.x + 10,
    y: tooltip.y + 22,
    fontSize: fontSizeTooltip,
    fontWeight: "bold"
  }, tooltip.value)))))), yScale && /*#__PURE__*/_react["default"].createElement(_reactNativeSvg["default"], {
    style: styles.yAxisContainer,
    width: margin.left,
    height: sizes.height
  }, /*#__PURE__*/_react["default"].createElement(_reactNativeSvg.G, {
    transform: "translate(".concat(margin.left - 10, ",").concat(margin.top, ")")
  }, /*#__PURE__*/_react["default"].createElement(_reactNativeSvg.Line, {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: height,
    stroke: "black"
  }), yScale.ticks(6).map(function (tick, i) {
    return /*#__PURE__*/_react["default"].createElement(_reactNativeSvg.G, {
      key: i
    }, /*#__PURE__*/_react["default"].createElement(_reactNativeSvg.Line, {
      x1: -6,
      x2: 0,
      y1: yScale(tick),
      y2: yScale(tick),
      stroke: "black"
    }), /*#__PURE__*/_react["default"].createElement(_reactNativeSvg.Text, {
      x: -9,
      y: yScale(tick),
      dy: ".32em",
      textAnchor: "end",
      fontSize: "11",
      fontWeight: "bold"
    }, "".concat((0, _formatNumber.formatterEuroToD3)(tick))));
  }))));
};
var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  chartContainer: {
    position: "relative"
  },
  yAxisContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: "#fff"
  },
  curtain: {
    position: "absolute",
    top: 35,
    left: 35,
    bottom: 0,
    backgroundColor: "#fff",
    zIndex: 1
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
  }
});
var _default = exports["default"] = MultipleVerticalBars;