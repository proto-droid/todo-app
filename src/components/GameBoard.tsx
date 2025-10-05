import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface GameBoardProps {
  board: (string | null)[];
  onPress: (index: number) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ board, onPress }) => {
  return (
    <View style={styles.board}>
      {board.map((cell, index) => (
        <TouchableOpacity
          key={index}
          style={styles.cell}
          onPress={() => onPress(index)}
        >
          <Text
            style={[
              styles.cellText,
              cell === "X" && styles.xText,
              cell === "O" && styles.oText,
            ]}
          >
            {cell || ""}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    width: 300,
    height: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#0f3460",
    borderRadius: 10,
    padding: 5,
  },
  cell: {
    width: "33.33%",
    height: "33.33%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#1a1a2e",
  },
  cellText: {
    fontSize: 48,
    fontWeight: "bold",
  },
  xText: {
    color: "#00d9ff",
  },
  oText: {
    color: "#ff006e",
  },
});
