import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle, G, Path, Text as SvgText } from "react-native-svg";

import { formatterEuro } from "../../utils/format-number";
import CircleAnimation from "./CircleAnimation";

const color = ["#183561", "#225b6c", "#157f99", "#18756b", "#29a992", "#96d2d0", "#1665a0", "#1685bd", "#4ca0cc", "#6dc8cb"];

export interface PieChartProps {
    data: any[];
    keyLabel: string;
    keyValue: string;
    loading?: boolean;
    error?: boolean;
    primaryKey: string;
}
const PieChart = (props: PieChartProps) => {
    const { data, keyLabel, keyValue, loading, error, primaryKey } = props;
    const { t } = useTranslation("global");
    const [sizes, setSizes] = useState({ width: 0, height: 0 });
    const [clonedData, setClonedData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const svgRef = useRef(null);
    const [animateKey, setAnimateKey] = useState(1);
    const scrollViewRef = useRef(null);
    const [svgRendered, setSvgRendered] = useState(false);

    useEffect(() => {
        if (data && data.length) {
            const combinedData = combineDataByPrimaryKey(data, primaryKey, keyValue);
            const cloned = combinedData.slice(0, 10); // Filtra los top 10 datos
            setClonedData(cloned);
        }
    }, [data]);

    useEffect(() => {
        if (svgRendered) {
            const scrollView = scrollViewRef.current;
            if (scrollView) {
                scrollView.scrollTo({ y: 0, animated: true });
                setAnimateKey(animateKey + 1);
            }
        }
    }, [svgRendered, clonedData]);

    const combineDataByPrimaryKey = (data, primaryKey, keyValue) => {
        const combinedData = data.reduce((acc, item) => {
            const existingItem = acc.find((d) => d[primaryKey] === item[primaryKey]);
            if (existingItem) {
                existingItem[keyValue] += item[keyValue];
            } else {
                acc.push({ ...item });
            }
            return acc;
        }, []);
        return combinedData;
    };

    const onLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;
        setSizes({ width, height });
        setSvgRendered(true);
    };

    const radius = Math.min(sizes.width, sizes.height) / 2;

    const pie = d3.pie().value((d: any) => d[keyValue])(clonedData || []);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    const labelArc = d3
        .arc()
        .innerRadius(radius - 40)
        .outerRadius(radius - 40);

    const totalValue = clonedData ? d3.sum(clonedData, (d: any) => d[keyValue]) : null;

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const circleTop = sizes.height / 2 - radius;
    const circleLeft = sizes.width / 2 - radius;

    return (
        <View style={styles.container} onLayout={onLayout}>
            {loading && <ActivityIndicator style={styles.loading} size="large" color="#c1c1c1" />}
            {error && <Text style={styles.error}>{t("without_data_label")}</Text>}
            <TouchableOpacity style={styles.button} onPress={toggleModal}>
                <Text style={styles.buttonText}>Show Legend</Text>
            </TouchableOpacity>
            <ScrollView ref={scrollViewRef} nestedScrollEnabled={Platform.OS === "android"} showsVerticalScrollIndicator persistentScrollbar>
                <View style={[styles.chartContainer, { width: sizes.width, height: sizes.height }]}>
                    {clonedData && (
                        <Svg ref={svgRef} width={sizes.width} height={sizes.height}>
                            <G transform={`translate(${sizes.width / 2},${sizes.height / 2})`}>
                                <Circle cx={0} cy={0} r={radius * 0.4} fill="none" stroke="#fff" strokeWidth={2} />
                                {pie.map((d, i) => {
                                    const percentage = (d.value / totalValue) * 100;
                                    return (
                                        <G key={i}>
                                            <Path d={arc(d)} fill={color[i % color.length]} />
                                            {percentage > 8 && (
                                                <SvgText
                                                    transform={`translate(${labelArc.centroid(d)})`}
                                                    dy=".35em"
                                                    textAnchor="middle"
                                                    fontSize={11}
                                                    fontWeight="bold"
                                                    fill="#fff"
                                                >
                                                    {`${percentage.toFixed(2)}%`}
                                                </SvgText>
                                            )}
                                        </G>
                                    );
                                })}
                            </G>
                        </Svg>
                    )}
                    {clonedData && <CircleAnimation radius={radius} top={circleTop} left={circleLeft} color="#fff" key={animateKey} />}
                </View>
            </ScrollView>
            <Modal animationType="slide" transparent visible={isModalVisible} onRequestClose={toggleModal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                        <ScrollView>
                            {clonedData &&
                                clonedData.map((item, index) => (
                                    <View key={index} style={styles.legendItem}>
                                        <View style={[styles.colorBox, { backgroundColor: color[index % color.length] }]} />
                                        <Text style={styles.legendText}>
                                            {item[keyLabel]}: {formatterEuro(item[keyValue])}
                                        </Text>
                                    </View>
                                ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
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
    button: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "#007bff",
        padding: 8,
        borderRadius: 5,
        zIndex: 10,
    },
    buttonText: {
        fontSize: 11,
        color: "#fff",
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        maxHeight: "70%",
    },
    closeButton: {
        alignSelf: "flex-end",
    },
    closeButtonText: {
        color: "#007bff",
        fontWeight: "bold",
        fontSize: 16,
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    colorBox: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    legendText: {
        fontSize: 16,
    },
});

export default PieChart;
