"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CurtainToAnimate;
var _react = require("react");
var _reactNative = require("react-native");
/**
 * Circle Animation Component (Curtain)
 * @param height to defined the height of the component
 * @param width to defined the width of the component
 * @param style to defined the color and other styles of the component
 * @param animationDuration to defined the time of animation of the component
 * @returns A square curtain to animated the svg bars
 */

function CurtainToAnimate(_ref) {
  var height = _ref.height,
    width = _ref.width,
    style = _ref.style,
    animationDuration = _ref.animationDuration;
  var curtainValue = new _reactNative.Animated.Value(height !== null && height !== void 0 ? height : width);
  (0, _react.useEffect)(function () {
    _reactNative.Animated.timing(curtainValue, {
      toValue: 0,
      duration: animationDuration !== null && animationDuration !== void 0 ? animationDuration : 750,
      easing: _reactNative.Easing.exp,
      useNativeDriver: false
    }).start();
  }, []);
  return /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [style, height ? {
      height: curtainValue
    } : {
      width: curtainValue
    }]
  });
}