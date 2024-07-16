import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { G, Line, Rect, Text as SvgText } from "react-native-svg";

import { formatterEuroToD3 } from "../utils/format-number";
import CurtainToAnimate from "./CurtainToAnimate";

const getRangeMaxValue = (maxValue) => {
  if (maxValue < 100) return 30;
  if (maxValue > 100 && maxValue < 500) return 50;
  if (maxValue > 500 && maxValue < 1000) return 100;
  if (maxValue > 1000 && maxValue < 3000) return 300;
  if (maxValue > 3000 && maxValue < 5000) return 500;
  if (maxValue > 5000 && maxValue < 15000) return 2000;
  if (maxValue > 15000 && maxValue < 30000) return 3500;
  if (maxValue > 30000 && maxValue < 50000) return 5000;
  if (maxValue > 50000 && maxValue < 75000) return 10000;
  if (maxValue > 75000 && maxValue < 100000) return 15000;
  if (maxValue > 100000 && maxValue < 200000) return 30000;
  if (maxValue > 200000) return 50000;
};

const filterDataByStoreId = (data, storeId) => {
  return {
    ...data,
    rows: data.rows.flat().filter((row) => row.botigaCodi === storeId),
  };
};

export default function MultipleHorizontalBars({
  data,
  storeId,
  loading,
  error,
}) {
  const [filteredData, setFilteredData] = useState(data);
  const [sizes, setSizes] = useState({ width: 0, height: 0 });
  const svgRef = useRef(null);
  const [animateKey, setAnimateKey] = useState(1);
  const [svgRendered, setSvgRendered] = useState(false);
  const scrollViewRef = useRef(null);
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
    }
  };

  useEffect(() => {
    if (data && storeId) {
      setFilteredData(filterDataByStoreId(data, storeId));
      handleContainerPress();
    }
  }, [data, storeId]);

  useEffect(() => {
    if (svgRendered) {
      const scrollView = scrollViewRef.current;
      if (scrollView) {
        const position = calculateScrollPosition(8);
        setTimeout(() => {
          scrollView.scrollTo({ x: position, animated: true });
        }, 50); // Small delay to ensure everything is rendered
        setAnimateKey(animateKey + 1);
      }
    }
  }, [svgRendered, storeId]);

  const calculateScrollPosition = (time) => {
    const position = (width / 27) * time;
    return position;
  };

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setSizes({ width: width * 3, height });
    setSvgRendered(true); // Mark SVG as rendered
  };

  if (loading)
    return (
      <ActivityIndicator style={styles.loading} size="large" color="#c1c1c1" />
    );
  if (error) return <Text style={styles.error}>{t("without_data_label")}</Text>;

  const {
    rows,
    maxValue,
    xAxisKeys,
    keyValue,
    keyX,
    formatAxis,
    verticalTextAxis = false,
  } = filteredData;

  const margin = {
    top: 10,
    right: 30,
    bottom: verticalTextAxis ? 80 : 30,
    left: 60,
  };
  const width = sizes.width - margin.left - margin.right;
  const height = sizes.height - margin.top - margin.bottom;

  const validRows = rows.filter(
    (row) => row && row[keyX] !== null && row[keyValue] >= 0
  );

  if (xAxisKeys.length === 0 || validRows.length === 0)
    return <Text style={styles.error}>No data available</Text>;

  const xScale = d3
    .scaleBand()
    .domain(xAxisKeys)
    .range([0, width])
    .padding(0.5);
  const barWidth = Math.min(40, xScale.bandwidth());

  const yScale = d3
    .scaleLinear()
    .domain([0, maxValue + getRangeMaxValue(maxValue)])
    .range([height, 0]);

  const handleBarPress = (value, x, y) => {
    setSelectedBar(value);
    setTooltip({ visible: true, value, x, y });
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator
        persistentScrollbar
      >
        <View style={styles.chartContainer}>
          {storeId && (
            <CurtainToAnimate
              height={height + 10}
              style={styles.curtain}
              key={animateKey}
            />
          )}
          <Svg
            ref={svgRef}
            width={sizes.width}
            height={sizes.height}
            onPress={handleContainerPress}
          >
            {/* Eje X */}
            <G transform={`translate(${margin.left},${margin.top})`}>
              <G transform={`translate(0,${height})`}>
                {xScale.domain().map((tick, i) => (
                  <G key={i}>
                    <Line
                      x1={xScale(tick) + xScale.bandwidth() / 2}
                      x2={xScale(tick) + xScale.bandwidth() / 2}
                      y1={0}
                      y2={5}
                      stroke="black"
                    />
                    <SvgText
                      x={xScale(tick) + xScale.bandwidth() / 2}
                      y={10}
                      dy=".71em"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="bold"
                    >
                      {formatAxisX(tick, formatAxis)}
                    </SvgText>
                  </G>
                ))}
              </G>
              {/* Bars */}
              {validRows?.map((row, i) => (
                <G key={i}>
                  <Rect
                    x={xScale(row[keyX]) + (xScale.bandwidth() - barWidth) / 2}
                    y={yScale(row[keyValue])}
                    width={barWidth}
                    height={height - yScale(row[keyValue])}
                    fill={selectedBar === row[keyValue] ? "#ad234f" : "#ad23aa"}
                    rx={5}
                    ry={5}
                    onPress={() =>
                      handleBarPress(
                        row[keyValue],
                        xScale(row[keyX]) + barWidth / 2,
                        yScale(row[keyValue])
                      )
                    }
                  />
                </G>
              ))}
              <Line x1={0} x2={width} y1={height} y2={height} stroke="black" />
              {tooltip.visible && (
                <G>
                  <Rect
                    x={tooltip.x}
                    y={tooltip.y}
                    width={100}
                    height={35}
                    fill="white"
                    stroke="gray"
                    strokeWidth={1}
                    rx={5}
                    ry={5}
                  />
                  <SvgText
                    x={tooltip.x + 10}
                    y={tooltip.y + 20}
                    fontSize="16"
                    fontWeight="bold"
                  >
                    {formatterEuroToD3(tooltip.value)}
                  </SvgText>
                </G>
              )}
            </G>
          </Svg>
        </View>
      </ScrollView>
      {/* Eje Y */}
      <Svg
        style={styles.yAxisContainer}
        width={margin.left}
        height={sizes.height}
      >
        <G transform={`translate(${margin.left - 10},${margin.top})`}>
          <Line x1={0} x2={0} y1={0} y2={height} stroke="black" />
          {yScale.ticks(6).map((tick, i) => (
            <G key={i}>
              <Line
                x1={-6}
                x2={0}
                y1={yScale(tick)}
                y2={yScale(tick)}
                stroke="black"
              />
              <SvgText
                x={-9}
                y={yScale(tick)}
                dy=".32em"
                textAnchor="end"
                fontSize="11"
                fontWeight="bold"
              >
                {`${formatterEuroToD3(tick)}`}
              </SvgText>
            </G>
          ))}
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    flexDirection: "row",
    marginBottom: 15,
  },
  chartContainer: {
    position: "relative",
  },
  curtain: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    zIndex: 1,
  },
  yAxisContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: "#fff",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
  },
});
