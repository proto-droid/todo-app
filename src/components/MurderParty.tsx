import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  fetchMurderPartyScenarios,
  fetchScenarioDetails,
} from "../services/googleSheets";
import { MurderPartyScenario, ScenarioDetails } from "../types";

interface Props {
  onBack: () => void;
}

export const MurderParty: React.FC<Props> = ({ onBack }) => {
  const [scenarios, setScenarios] = useState<MurderPartyScenario[]>([]);
  const [selectedScenario, setSelectedScenario] =
    useState<ScenarioDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = async () => {
    setLoading(true);
    const data = await fetchMurderPartyScenarios();
    setScenarios(data);
    setLoading(false);
  };

  const loadScenarioDetails = async (scenario: MurderPartyScenario) => {
    if (!scenario.sheetId) {
      alert("Sheet ID manquant pour ce scénario");
      return;
    }

    setDetailsLoading(true);
    const details = await fetchScenarioDetails(scenario.sheetId);
    setSelectedScenario(details);
    setDetailsLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00d9ff" />
        <Text style={styles.loadingText}>Chargement des scénarios...</Text>
      </View>
    );
  }

  if (selectedScenario) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedScenario(null)}
        >
          <Text style={styles.backButtonText}>← Retour aux scénarios</Text>
        </TouchableOpacity>

        <ScrollView style={styles.detailsContainer}>
          {/* PERSONNAGES */}
          <Text style={styles.sectionTitle}>🎭 Personnages</Text>
          {selectedScenario.personnages.map((p) => (
            <View key={p.id} style={styles.personCard}>
              <Text style={styles.personName}>
                {p.nom} {p.estMeurtrier ? "🔪" : ""}
              </Text>
              <Text style={styles.personRole}>{p.role}</Text>
              <Text style={styles.personSecret}>Secret : {p.secret}</Text>
              <Text style={styles.personAlibi}>Alibi : {p.alibi}</Text>
            </View>
          ))}

          {/* TIMELINE */}
          <Text style={styles.sectionTitle}>⏱️ Déroulement</Text>
          {selectedScenario.timeline.map((t, i) => (
            <View key={i} style={styles.timelineCard}>
              <Text style={styles.timelineTime}>{t.temps}</Text>
              <Text style={styles.timelinePhase}>{t.phase}</Text>
              <Text style={styles.timelineDesc}>{t.description}</Text>
            </View>
          ))}

          {/* INDICES */}
          <Text style={styles.sectionTitle}>🔍 Indices</Text>
          {selectedScenario.indices.map((indice) => (
            <View key={indice.id} style={styles.indiceCard}>
              <Text style={styles.indiceTitle}>{indice.titre}</Text>
              <Text style={styles.indiceDesc}>{indice.description}</Text>
              <Text style={styles.indiceRev}>
                Révélation : {indice.revelation}
              </Text>
            </View>
          ))}

          {/* SOLUTION */}
          <Text style={styles.sectionTitle}>✅ Solution</Text>
          <View style={styles.solutionCard}>
            <Text style={styles.solutionText}>
              Coupable : {selectedScenario.solution.coupable}
            </Text>
            <Text style={styles.solutionText}>
              Arme : {selectedScenario.solution.arme}
            </Text>
            <Text style={styles.solutionText}>
              Lieu : {selectedScenario.solution.lieu}
            </Text>
            <Text style={styles.solutionText}>
              Mobile : {selectedScenario.solution.mobile}
            </Text>
            <Text style={styles.solutionDesc}>
              {selectedScenario.solution.deroulement}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Accueil</Text>
      </TouchableOpacity>

      <Text style={styles.title}>🔪 Murder Party</Text>
      <Text style={styles.subtitle}>
        {scenarios.length} scénarios disponibles
      </Text>

      <ScrollView style={styles.scenarioList}>
        {scenarios.map((scenario) => (
          <TouchableOpacity
            key={scenario.id}
            style={styles.scenarioCard}
            onPress={() => loadScenarioDetails(scenario)}
          >
            <Text style={styles.cardTitle}>{scenario.titre}</Text>
            <Text style={styles.cardTheme}>{scenario.theme}</Text>
            <View style={styles.cardInfo}>
              <Text style={styles.cardInfoText}>
                👥 {scenario.nombreJoueurs}
              </Text>
              <Text style={styles.cardInfoText}>⏱️ {scenario.duree}</Text>
              <Text style={styles.cardInfoText}>🎯 {scenario.difficulte}</Text>
            </View>
            {scenario.description ? (
              <Text style={styles.cardDesc}>{scenario.description}</Text>
            ) : null}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {detailsLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#00d9ff" />
          <Text style={styles.loadingText}>Chargement du scénario...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: "#00d9ff",
    fontSize: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ff006e",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#e0e0e0",
    textAlign: "center",
    marginBottom: 20,
  },
  scenarioList: {
    flex: 1,
  },
  scenarioCard: {
    backgroundColor: "#16213e",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#ff006e",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00d9ff",
    marginBottom: 8,
  },
  cardTheme: {
    fontSize: 14,
    color: "#ff006e",
    marginBottom: 8,
  },
  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardInfoText: {
    color: "#e0e0e0",
    fontSize: 14,
  },
  cardDesc: {
    color: "#b0b0b0",
    fontSize: 14,
    marginTop: 8,
  },
  loadingText: {
    color: "#e0e0e0",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00d9ff",
    marginTop: 20,
    marginBottom: 12,
  },
  personCard: {
    backgroundColor: "#0f3460",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  personName: {
    color: "#ff006e",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  personRole: {
    color: "#00d9ff",
    fontSize: 16,
    marginBottom: 4,
  },
  personSecret: {
    color: "#e0e0e0",
    fontSize: 14,
    marginTop: 4,
  },
  personAlibi: {
    color: "#b0b0b0",
    fontSize: 14,
    marginTop: 4,
  },
  timelineCard: {
    backgroundColor: "#0f3460",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  timelineTime: {
    color: "#ff006e",
    fontSize: 16,
    fontWeight: "bold",
  },
  timelinePhase: {
    color: "#00d9ff",
    fontSize: 14,
    marginTop: 4,
  },
  timelineDesc: {
    color: "#e0e0e0",
    fontSize: 14,
    marginTop: 4,
  },
  indiceCard: {
    backgroundColor: "#0f3460",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  indiceTitle: {
    color: "#ff006e",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  indiceDesc: {
    color: "#e0e0e0",
    fontSize: 14,
    marginTop: 4,
  },
  indiceRev: {
    color: "#b0b0b0",
    fontSize: 12,
    marginTop: 4,
    fontStyle: "italic",
  },
  solutionCard: {
    backgroundColor: "#0f3460",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#ff006e",
  },
  solutionText: {
    color: "#00d9ff",
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  solutionDesc: {
    color: "#e0e0e0",
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
});
