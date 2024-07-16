import { useEffect } from "react";
import { Animated, Easing } from "react-native";

/**
 * Circle Animation Component (Curtain)
 * @param radius to defined the radius of the component  
 * @param top to defined the top position of the component  
 * @param left to defined the left position of the component  
 * @param color to defined the color of the component  
 * @param animationDuration to defined the time of animation of the component 
 * @returns A circle curtain to animated the svg circle
 */

export default function CircleAnimation({ radius, top, left, color, animationDuration }) {
  const animatedValue = new Animated.Value(radius + 10); // Aumentar el radio inicial

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: animationDuration ?? 800,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        width: (radius + 15) * 2,
        height: (radius + 15) * 2,
        borderRadius: radius + 15,
        borderWidth: animatedValue,
        borderColor: color,
        position: "absolute",
        top: top - 15,
        left: left - 15,
      }}
    />
  );
}
