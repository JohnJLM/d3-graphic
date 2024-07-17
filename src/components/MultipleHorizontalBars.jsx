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

const MultipleHorizontalBars = ({
  data,
  keyLabel,
  keyValue,
  loading,
  error,
  primaryKey,
  colors = defaultColors,
  withoutDataMessage = "Without Data",
}) => {
  const [sizes, setSizes] = useState({ width: 0, height: 0 });
  const [clonedData, setClonedData] = useState(null);
  //Animation
  const svgRef = useRef(null);
  const [animateKey, setAnimateKey] = useState(1);
  const scrollViewRef = useRef(null);
  const [svgRendered, setSvgRendered] = useState(false);
  //Tooltip
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

  //Animation
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

  const margin = { top: 35, right: 25, bottom: 10, left: 70 };
  const width = sizes.width - margin.left - margin.right;
  const barHeight = 22.6;
  const barSpacing = 10;
  const height = clonedData
    ? clonedData.length * (barHeight + barSpacing) - barSpacing
    : 0;
  const containerHeight = Math.max(
    height + margin.top + margin.bottom,
    sizes.height
  );
  const fontSizeTooltip = 15;

  let xScale = null;
  let yScale = null;

  if (clonedData) {
    const maxValue = d3.max(clonedData, (d) => d[keyValue]);

    xScale = d3.scaleLinear().domain([0, maxValue]).range([0, width]);

    yScale = d3
      .scaleBand()
      .domain(clonedData.map((d) => d[primaryKey]))
      .range([0, height])
      .paddingInner(0.1)
      .paddingOuter(0.1);
  }

  const handleBarPress = (value, y, primaryKey) => {
    setSelectedBar(primaryKey);
    setTooltip({ visible: true, value, x: width / 6, y });
  };

  // Helper function to truncate text with ellipsis
  const truncateText = (text, maxWidth) => {
    if (text?.length * 3 <= maxWidth) return text;
    return text.substring(0, Math.floor(maxWidth / 3.5) - 3) + "...";
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
      {error && <Text style={styles.error}>{withoutDataMessage}</Text>}
      <ScrollView
        ref={scrollViewRef}
        nestedScrollEnabled={Platform.OS === "android"} // only for Android
        showsVerticalScrollIndicator
        persistentScrollbar
      >
        <View
          style={[
            styles.chartContainer,
            { width: sizes.width, height: containerHeight },
          ]}
        >
          {clonedData && (
            <CurtainToAnimate
              width={width}
              style={[styles.curtain, { height: height + 9 }]}
              key={animateKey}
            />
          )}
          {yScale && (
            <Svg
              ref={svgRef}
              width={sizes.width}
              height={containerHeight}
              onPress={handleContainerPress}
            >
              <G transform={`translate(${margin.left},${margin.top})`}>
                {/* Eje Y */}
                <G>
                  <Line y1={-5} y2={height} stroke="black" />
                  {clonedData.map((row, i) => (
                    <G
                      key={i}
                      transform={`translate(0, ${
                        yScale(row[primaryKey]) + yScale.bandwidth() / 2
                      })`}
                    >
                      <Line x1={0} x2={-6} stroke="black" />
                      <SvgText
                        x={-8}
                        dy=".25em"
                        textAnchor="end"
                        fontSize={11}
                        fontWeight="bold"
                      >
                        {row[keyLabel] ? truncateText(row[keyLabel], 35) : ""}
                      </SvgText>
                    </G>
                  ))}
                </G>

                {/* Barras */}
                {clonedData.map((row, i) => (
                  <G key={i}>
                    <Rect
                      key={i}
                      y={yScale(row[primaryKey])}
                      height={22.6}
                      fill={
                        selectedBar === row[primaryKey]
                          ? "#ad234f"
                          : colors[i % colors.length]
                      }
                      x={4}
                      rx={5}
                      ry={5}
                      width={xScale(row[keyValue])}
                      onPress={() =>
                        handleBarPress(
                          `${row[keyLabel] ?? ""} : ${formatterEuro(
                            row[keyValue]
                          )}`,
                          yScale(row[primaryKey]),
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
      {/* Eje X */}
      {xScale && (
        <Svg
          style={styles.xAxisContainer}
          width={sizes.width}
          height={margin.top}
        >
          <G transform={`translate(${margin.left}, 0)`}>
            <Line
              x1={0}
              x2={width}
              y1={margin.top - 2}
              y2={margin.top - 2}
              stroke="black"
            />
            {xScale.ticks(5).map((tick, i) => (
              <G
                key={i}
                transform={`translate(${xScale(tick)}, ${margin.top - 25})`}
              >
                <SvgText
                  y={10}
                  dy={0}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight="bold"
                >
                  {formatterEuroToD3(tick)}
                </SvgText>
                <Line y1={15} y2={22} stroke="black" />
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
  xAxisContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: "#fff",
  },
  curtain: {
    position: "absolute",
    top: 35,
    right: 20,
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

export default MultipleHorizontalBars;
