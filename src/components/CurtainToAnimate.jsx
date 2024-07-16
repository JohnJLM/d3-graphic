import { useEffect } from "react";
import { Animated, Easing } from "react-native";

/**
 * Circle Animation Component (Curtain)
 * @param height to defined the height of the component  
 * @param width to defined the width of the component  
 * @param style to defined the color and other styles of the component  
 * @param animationDuration to defined the time of animation of the component 
 * @returns A square curtain to animated the svg bars
 */

export default function CurtainToAnimate({height,width, style, animationDuration}) {
  const { style, height, width, animationDuration } = props;
  const curtainValue = new Animated.Value(height ?? width);

  useEffect(() => {
    Animated.timing(curtainValue, {
      toValue: 0,
      duration:animationDuration ?? 750,
      easing: Easing.exp,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        style,
        height
          ? {
              height: curtainValue,
            }
          : { width: curtainValue },
      ]}
    />
  );
}
