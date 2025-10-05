import React from "react";
import { View, StyleSheet } from "react-native";

export const CloseIcon = () => (
  <View style={styles.closeIcon}>
    <View style={[styles.line, styles.line1]} />
    <View style={[styles.line, styles.line2]} />
  </View>
);

export const RotateCcwIcon = () => (
  <View style={styles.rotateIcon}>
    <View style={styles.arrow} />
  </View>
);

const styles = StyleSheet.create({
  closeIcon: {
    width: 20,
    height: 20,
    position: "relative",
  },
  line: {
    position: "absolute",
    width: 20,
    height: 2,
    backgroundColor: "#fff",
    top: 9,
  },
  line1: {
    transform: [{ rotate: "45deg" }],
  },
  line2: {
    transform: [{ rotate: "-45deg" }],
  },
  rotateIcon: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 10,
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 8,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#fff",
    position: "absolute",
    top: -5,
    left: 5,
  },
});
