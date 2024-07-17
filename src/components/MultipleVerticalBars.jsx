import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { G, Line, Rect, Text as SvgText } from "react-native-svg";

import { formatterEuro, formatterEuroToD3 } from "../utils/format-number";
import CurtainToAnimate from "./CurtainToAnimate";
import { defaultColors } from "./colors";

const MultipleVerticalBars = ({ data, keyLabel, keyValue, loading, error, primaryKey, colors = defaultColors }) => {
  const [sizes, setSizes] = useState({ width: 0, height: 0 });
  const [clonedData, setClonedData] = useState(null);
  // Animation
  const svgRef = useRef(null);
  const [animateKey, setAnimateKey] = useState(1);
  const scrollViewRef = useRef(null);
  const [svgRendered, setSvgRendered] = useState(false);
  // Tooltip
  const [selectedBar, setSelectedBar] = useState(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    value: 0,
    x: 0,
    y: 0,
  });

  const handleContainerPress = () => {
    if (selectedBar !== null) {
      setTooltip({ visible: false, value: null, x: null, y: null });
      setSelectedBar(null);
    } else if (tooltip.visible) {
      setTooltip({ visible: false, value: null, x: null, y: null });
      setSelectedBar(null);
    }
  };

  useEffect(() => {
    if (data) {
      const cloned = filterByTopTen(data, keyValue);
      setClonedData(cloned);
      handleContainerPress();
    }
  }, [data]);

  // Animation
  useEffect(() => {
    if (svgRendered) {
      const scrollView = scrollViewRef.current;
      if (scrollView) {
        scrollView.scrollTo({ y: 0, animated: true });
        setAnimateKey(animateKey + 1);
      }
    }
  }, [svgRendered, clonedData]);

  const filterByTopTen = (data, keyValue) =>
    data.sort((a, b) => b[keyValue] - a[keyValue]);

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setSizes({ width, height });
    setSvgRendered(true); // Mark SVG as rendered
  };

  const margin = { top: 35, right: 25, bottom: 85, left: 35 };
  const height = sizes.height - margin.top - margin.bottom;
  const barWidth = 22.6;
  const barSpacing = 10;
  const width = clonedData
    ? clonedData.length * (barWidth + barSpacing) - barSpacing
    : 0;
  const containerWidth = Math.max(
    width + margin.left + margin.right,
    sizes.width
  );
  const fontSizeTooltip = 15;

  let xScale = null;
  let yScale = null;

  if (clonedData) {
    const maxValue = d3.max(clonedData, (d) => d[keyValue]);

    yScale = d3.scaleLinear().domain([0, maxValue]).range([height, 0]);

    xScale = d3
      .scaleBand()
      .domain(clonedData.map((d) => d[primaryKey]))
      .range([0, width])
      .paddingInner(0.1)
      .paddingOuter(0.1);
  }

  const handleBarPress = (value, x, primaryKey) => {
    setSelectedBar(primaryKey);
    setTooltip({ visible: true, value, x, y: height / 2 });
  };

  // Helper function to truncate text with ellipsis
  const truncateText = (text, maxWidth) => {
    if (text?.length * 4 <= maxWidth) return text;
    return text.substring(0, Math.floor(maxWidth / 4) - 3) + "...";
  };

  const calculateTooltipWidth = (text) => {
    return text.length * (fontSizeTooltip * 0.5);
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      {loading && (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color="#c1c1c1"
        />
      )}
      {error && <Text style={styles.error}>{"without_data_label"}</Text>}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        nestedScrollEnabled={Platform.OS === "android"} // only for Android
        showsHorizontalScrollIndicator
        persistentScrollbar
      >
        <View
          style={[
            styles.chartContainer,
            { width: containerWidth, height: sizes.height },
          ]}
        >
          {clonedData && (
            <CurtainToAnimate
              height={height}
              style={[styles.curtain, { width: width + 9 }]}
              key={animateKey}
            />
          )}
          {xScale && (
            <Svg
              ref={svgRef}
              width={containerWidth}
              height={sizes.height}
              onPress={handleContainerPress}
            >
              <G transform={`translate(${margin.left},${margin.top})`}>
                {/* Eje X */}
                <G transform={`translate(0, ${height})`}>
                  <Line x1={0} x2={width} stroke="black" />
                  {clonedData.map((row, i) => (
                    <G
                      key={i}
                      transform={`translate(${
                        xScale(row[primaryKey]) + xScale.bandwidth() / 2
                      }, 0)`}
                    >
                      <Line y1={0} y2={6} stroke="black" />
                      <SvgText
                        y={10}
                        dy=".71em"
                        textAnchor="middle"
                        fontSize={11}
                        fontWeight="bold"
                      >
                        {row[keyLabel]
                          ? truncateText(row[keyLabel], xScale.bandwidth())
                          : ""}
                      </SvgText>
                    </G>
                  ))}
                </G>

                {/* Barras */}
                {clonedData.map((row, i) => (
                  <G key={i}>
                    <Rect
                      key={i}
                      x={xScale(row[primaryKey])}
                      y={yScale(row[keyValue])}
                      width={xScale.bandwidth()}
                      height={height - yScale(row[keyValue])}
                      fill={
                        selectedBar === row[primaryKey]
                          ? "#ad234f"
                          : colors[i % colors.length]
                      }
                      rx={5}
                      ry={5}
                      onPress={() =>
                        handleBarPress(
                          `${row[keyLabel] ?? ""} : ${formatterEuro(
                            row[keyValue]
                          )}`,
                          xScale(row[primaryKey]),
                          row[primaryKey]
                        )
                      }
                    />
                  </G>
                ))}
                {tooltip.visible && (
                  <G>
                    <Rect
                      x={tooltip.x}
                      y={tooltip.y}
                      width={calculateTooltipWidth(tooltip.value)}
                      height={35}
                      fill="white"
                      stroke="gray"
                      strokeWidth={1}
                      rx={5}
                      ry={5}
                    />
                    <SvgText
                      x={tooltip.x + 10}
                      y={tooltip.y + 22}
                      fontSize={fontSizeTooltip}
                      fontWeight="bold"
                    >
                      {tooltip.value}
                    </SvgText>
                  </G>
                )}
              </G>
            </Svg>
          )}
        </View>
      </ScrollView>
      {/* Eje Y */}
      {yScale && (
        <Svg
          style={styles.yAxisContainer}
          width={margin.left}
          height={sizes.height}
        >
          <G transform={`translate(${margin.left - 2}, ${margin.top})`}>
            <Line
              y1={0}
              y2={height}
              x1={-margin.left + 2}
              x2={-margin.left + 2}
              stroke="black"
            />
            {yScale.ticks(5).map((tick, i) => (
              <G key={i} transform={`translate(0, ${yScale(tick)})`}>
                <SvgText
                  x={-margin.left + 7}
                  dy=".32em"
                  textAnchor="end"
                  fontSize={11}
                  fontWeight="bold"
                >
                  {formatterEuroToD3(tick)}
                </SvgText>
                <Line x1={-6} x2={0} stroke="black" />
              </G>
            ))}
          </G>
        </Svg>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chartContainer: {
    position: "relative",
  },
  yAxisContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: "#fff",
  },
  curtain: {
    position: "absolute",
    top: 35,
    left: 35,
    bottom: 0,
    backgroundColor: "#fff",
    zIndex: 1,
  },
  loading: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "red",
  },
});

export default MultipleVerticalBars;