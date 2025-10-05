import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Dimensions,
} from "react-native";
import { MurderParty } from "./src/components/MurderParty";
import { Quiz } from "./src/components/Quiz";

const { width, height } = Dimensions.get("window");

type Screen = "home" | "murderParty" | "quiz";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");

  // 🏠 ÉCRAN D'ACCUEIL
  if (currentScreen === "home") {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* Fond d'écran avec overlay */}
        <ImageBackground
          source={require("./assets/background.jpg")} // Ajoute une image si tu veux
          style={styles.background}
          blurRadius={3}
        >
          <View style={styles.overlay} />

          <View style={styles.content}>
            {/* TITRE */}
            <View style={styles.header}>
              <Text style={styles.mainTitle}>🎭 GAME MASTER</Text>
              <Text style={styles.subtitle}>Choisissez votre aventure</Text>
            </View>

            {/* BOUTONS PRINCIPAUX */}
            <View style={styles.buttonsContainer}>
              {/* MURDER PARTY */}
              <TouchableOpacity
                style={[styles.mainButton, styles.murderButton]}
                onPress={() => setCurrentScreen("murderParty")}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonEmoji}>🔪</Text>
                <Text style={styles.buttonTitle}>Murder Party</Text>
                <Text style={styles.buttonDesc}>Enquêtes & Mystères</Text>
              </TouchableOpacity>

              {/* QUIZ */}
              <TouchableOpacity
                style={[styles.mainButton, styles.quizButton]}
                onPress={() => setCurrentScreen("quiz")}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonEmoji}>🧠</Text>
                <Text style={styles.buttonTitle}>Quiz</Text>
                <Text style={styles.buttonDesc}>Culture & Stratégie</Text>
              </TouchableOpacity>
            </View>

            {/* FOOTER */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Propulsé par Google Sheets API
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  // 🔪 ÉCRAN MURDER PARTY
  if (currentScreen === "murderParty") {
    return <MurderParty onBack={() => setCurrentScreen("home")} />;
  }

  // 🧠 ÉCRAN QUIZ
  if (currentScreen === "quiz") {
    return <Quiz onBack={() => setCurrentScreen("home")} />;
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(26, 26, 46, 0.85)", // Overlay sombre
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
  },
  mainTitle: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    textShadowColor: "rgba(0, 217, 255, 0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    color: "#b0b0b0",
    marginTop: 10,
    textAlign: "center",
    letterSpacing: 1,
  },
  buttonsContainer: {
    width: "100%",
    maxWidth: 400,
    gap: 20,
  },
  mainButton: {
    width: "100%",
    height: 160,
    borderRadius: 20,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 2,
  },
  murderButton: {
    backgroundColor: "#16213e",
    borderColor: "#ff006e",
  },
  quizButton: {
    backgroundColor: "#0f3460",
    borderColor: "#00d9ff",
  },
  buttonEmoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  buttonTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    letterSpacing: 1,
  },
  buttonDesc: {
    fontSize: 14,
    color: "#b0b0b0",
    textAlign: "center",
  },
  footer: {
    alignItems: "center",
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
