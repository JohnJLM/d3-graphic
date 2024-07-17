"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CircleAnimation;
var _react = require("react");
var _reactNative = require("react-native");
/**
 * Circle Animation Component (Curtain)
 * @param radius to defined the radius of the component  
 * @param top to defined the top position of the component  
 * @param left to defined the left position of the component  
 * @param color to defined the color of the component  
 * @param animationDuration to defined the time of animation of the component 
 * @returns A circle curtain to animated the svg circle
 */

function CircleAnimation(_ref) {
  var radius = _ref.radius,
    top = _ref.top,
    left = _ref.left,
    color = _ref.color,
    animationDuration = _ref.animationDuration;
  var animatedValue = new _reactNative.Animated.Value(radius + 10); // Aumentar el radio inicial

  (0, _react.useEffect)(function () {
    _reactNative.Animated.timing(animatedValue, {
      toValue: 0,
      duration: animationDuration !== null && animationDuration !== void 0 ? animationDuration : 800,
      easing: _reactNative.Easing.linear,
      useNativeDriver: false
    }).start();
  }, []);
  return /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: {
      width: (radius + 15) * 2,
      height: (radius + 15) * 2,
      borderRadius: radius + 15,
      borderWidth: animatedValue,
      borderColor: color,
      position: "absolute",
      top: top - 15,
      left: left - 15
    }
  });
}