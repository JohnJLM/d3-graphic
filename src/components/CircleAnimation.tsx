import { useEffect } from "react";
import { Animated, Easing } from "react-native";

export default function CircleAnimation({ radius, top, left, color }) {
    const animatedValue = new Animated.Value(radius + 10); // Aumentar el radio inicial

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 800,
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
