import { colors } from "constant";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Rect } from "react-native-svg";

const ProgressBar = ({ success, barColor = { right: colors.progressBarRed } }) => {
    const [containerWidth, setContainerWidth] = useState(0);

    return (
        <View
            style={styles.container}
            onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                setContainerWidth(width);
            }}
        >
            {containerWidth > 0 && (
                <Svg width={containerWidth} height={20}>
                    <Rect x="0" y="0" width={(success / 100) * containerWidth} height={10} fill={colors.progressBarSuccess} />
                    <Rect x={(success / 100) * containerWidth} y="0" width={containerWidth - (success / 100) * containerWidth} height={10} fill={barColor.right} />
                </Svg>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 10,
        width: "100%",
    },
});

export default ProgressBar;
