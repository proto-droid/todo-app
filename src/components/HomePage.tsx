import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface HomePageProps {
  onSelectGame: (game: "murder-party" | "quiz") => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectGame }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎭 BIENVENUE</Text>
      <Text style={styles.subtitle}>Choisissez votre jeu</Text>

      <View style={styles.gameGrid}>
        <TouchableOpacity
          style={[styles.gameCard, styles.murderPartyCard]}
          onPress={() => onSelectGame("murder-party")}
        >
          <Text style={styles.gameEmoji}>🔪</Text>
          <Text style={styles.gameName}>Murder Party</Text>
          <Text style={styles.gameDescription}>
            Enquêtes immersives et mystères à résoudre
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.gameCard, styles.quizCard]}
          onPress={() => onSelectGame("quiz")}
        >
          <Text style={styles.gameEmoji}>🧠</Text>
          <Text style={styles.gameName}>Quiz</Text>
          <Text style={styles.gameDescription}>
            Testez vos connaissances sur divers thèmes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#00d9ff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: "#e0e0e0",
    textAlign: "center",
    marginBottom: 40,
  },
  gameGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: 20,
  },
  gameCard: {
    width: "45%",
    minHeight: 200,
    borderRadius: 15,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  murderPartyCard: {
    backgroundColor: "#8b0000",
  },
  quizCard: {
    backgroundColor: "#4a148c",
  },
  gameEmoji: {
    fontSize: 64,
    marginBottom: 15,
  },
  gameName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  gameDescription: {
    fontSize: 14,
    color: "#e0e0e0",
    textAlign: "center",
  },
});
