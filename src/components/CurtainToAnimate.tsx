import { useEffect } from "react";
import { Animated, Easing } from "react-native";

export interface CurtainToAnimateProps {
    height?: number;
    width?: number;
    style?: any;
}
export default function CurtainToAnimate(props: CurtainToAnimateProps) {
    const { style, height, width } = props;
    const curtainValue = new Animated.Value(height ?? width);

    useEffect(() => {
        Animated.timing(curtainValue, {
            toValue: 0,
            duration: 750,
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
