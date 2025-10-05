import axios from "axios";
import { MurderPartyScenario, QuizQuestion } from "../types";

// 🎯 IDS DE TES GOOGLE SHEETS
const MASTER_SHEET_ID = "1La6Cix4c0yUtrfEvRBQNmJyBs4o1AF_yXda_Qm-RLqM";
const QUIZ_SHEET_ID = "1CJCd_HZVj-A-pO-ARNHacC9zNZWrJBguqy_kcR9ydOY";

// 🔧 FONCTION GÉNÉRIQUE POUR RÉCUPÉRER DES DONNÉES
const fetchSheetData = async (sheetId: string, range: string) => {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${range}`;
    const response = await axios.get(url);

    // Google retourne du JSON avec préfixe à retirer
    const jsonString = response.data.substring(47).slice(0, -2);
    const data = JSON.parse(jsonString);

    return data.table.rows.map((row: any) =>
      row.c.map((cell: any) => cell?.v || "")
    );
  } catch (error) {
    console.error(`Erreur chargement ${range}:`, error);
    return [];
  }
};

// 🔪 MURDER PARTY : LISTE DES SCÉNARIOS
export const fetchMurderPartyScenarios = async (): Promise<
  MurderPartyScenario[]
> => {
  try {
    const rows = await fetchSheetData(MASTER_SHEET_ID, "Index_Scenarios");

    // Retire la ligne d'en-têtes
    return rows.slice(1).map((row: string[], index: number) => ({
      id: row[0] || `mp-${index + 1}`,
      titre: row[1] || "Sans titre",
      theme: row[2] || "Mystère",
      nombreJoueurs: row[3] || "6-10",
      difficulte: row[4] || "Moyen",
      duree: row[5] || "2h",
      description: row[6] || "",
      sheetUrl: row[7] || "",
      sheetId: extractSheetId(row[7] || ""),
      roles: [],
      indices: [],
      solution: "",
    }));
  } catch (error) {
    console.error("Erreur chargement scénarios Murder Party:", error);
    return [];
  }
};

// 🔪 MURDER PARTY : DÉTAILS D'UN SCÉNARIO
export const fetchScenarioDetails = async (sheetId: string) => {
  try {
    const [personnages, timeline, indices, solution] = await Promise.all([
      fetchSheetData(sheetId, "Personnages"),
      fetchSheetData(sheetId, "Timeline"),
      fetchSheetData(sheetId, "Indices"),
      fetchSheetData(sheetId, "Solution"),
    ]);

    return {
      personnages: personnages.slice(1).map((row: string[]) => ({
        id: row[0],
        nom: row[1],
        role: row[2],
        secret: row[3],
        alibi: row[4],
        estMeurtrier: row[5]?.toLowerCase() === "oui",
      })),
      timeline: timeline.slice(1).map((row: string[]) => ({
        temps: row[0],
        phase: row[1],
        description: row[2],
        indicesReveles: row[3]?.split(",").map((s) => s.trim()) || [],
      })),
      indices: indices.slice(1).map((row: string[]) => ({
        id: row[0],
        titre: row[1],
        description: row[2],
        revelation: row[3],
        type: row[4],
      })),
      solution: {
        coupable: solution[1]?.[0] || "",
        arme: solution[1]?.[1] || "",
        lieu: solution[1]?.[2] || "",
        mobile: solution[1]?.[3] || "",
        deroulement: solution[1]?.[4] || "",
      },
    };
  } catch (error) {
    console.error("Erreur chargement détails scénario:", error);
    return null;
  }
};

// 🧠 QUIZ : LISTE DES QUESTIONS
export const fetchQuizQuestions = async (): Promise<QuizQuestion[]> => {
  try {
    const rows = await fetchSheetData(QUIZ_SHEET_ID, "Questions");

    return rows.slice(1).map((row: string[], index: number) => ({
      id: `quiz-${index + 1}`,
      categorie: row[0] || "Général",
      question: row[1] || "",
      reponseA: row[2] || "",
      reponseB: row[3] || "",
      reponseC: row[4] || "",
      reponseD: row[5] || "",
      bonneReponse: row[6] || "A",
      explication: row[7] || "",
      difficulte: row[8] || "Moyen",
    }));
  } catch (error) {
    console.error("Erreur chargement questions Quiz:", error);
    return [];
  }
};

// 🔧 HELPER : EXTRAIRE L'ID D'UNE URL GOOGLE SHEETS
const extractSheetId = (url: string): string => {
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : "";
};
