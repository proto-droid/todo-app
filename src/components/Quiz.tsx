import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { fetchQuizQuestions } from "../services/googleSheets";
import { QuizQuestion } from "../types";

interface Props {
  onBack: () => void;
}

export const Quiz: React.FC<Props> = ({ onBack }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    const data = await fetchQuizQuestions();
    setQuestions(data);
    setLoading(false);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);

    if (answer === questions[currentIndex].bonneReponse) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowExplanation(false);
    setQuizFinished(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00d9ff" />
        <Text style={styles.loadingText}>Chargement des questions...</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Accueil</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>Aucune question disponible</Text>
      </View>
    );
  }

  // ÉCRAN FIN DE QUIZ
  if (quizFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    let message = "";
    let emoji = "";

    if (percentage >= 80) {
      message = "Excellent !";
      emoji = "🏆";
    } else if (percentage >= 60) {
      message = "Bien joué !";
      emoji = "🎉";
    } else if (percentage >= 40) {
      message = "Pas mal !";
      emoji = "👍";
    } else {
      message = "Continuez à pratiquer !";
      emoji = "💪";
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Accueil</Text>
        </TouchableOpacity>

        <View style={styles.finishContainer}>
          <Text style={styles.finishEmoji}>{emoji}</Text>
          <Text style={styles.finishTitle}>{message}</Text>
          <Text style={styles.finishScore}>
            {score} / {questions.length}
          </Text>
          <Text style={styles.finishPercentage}>{percentage}%</Text>

          <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
            <Text style={styles.restartButtonText}>🔄 Recommencer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeButton} onPress={onBack}>
            <Text style={styles.homeButtonText}>🏠 Accueil</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Accueil</Text>
      </TouchableOpacity>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>🧠 Quiz</Text>
        <Text style={styles.progressText}>
          Question {currentIndex + 1} / {questions.length}
        </Text>
        <Text style={styles.scoreText}>Score : {score}</Text>
      </View>

      {/* QUESTION */}
      <ScrollView style={styles.quizContainer}>
        <View style={styles.questionCard}>
          <Text style={styles.categoryText}>{currentQuestion.categorie}</Text>
          <Text style={styles.difficultyText}>
            {currentQuestion.difficulte}
          </Text>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>

        {/* RÉPONSES */}
        <View style={styles.answersContainer}>
          {["A", "B", "C", "D"].map((letter) => {
            const answerText = currentQuestion[
              `reponse${letter}` as keyof QuizQuestion
            ] as string;
            const isSelected = selectedAnswer === letter;
            const isCorrect = letter === currentQuestion.bonneReponse;
            const showResult = showExplanation;

            let buttonStyle = styles.answerButton;
            if (showResult) {
              if (isCorrect) {
                buttonStyle = styles.answerButtonCorrect;
              } else if (isSelected && !isCorrect) {
                buttonStyle = styles.answerButtonWrong;
              }
            } else if (isSelected) {
              buttonStyle = styles.answerButtonSelected;
            }

            return (
              <TouchableOpacity
                key={letter}
                style={buttonStyle}
                onPress={() => !showExplanation && handleAnswer(letter)}
                disabled={showExplanation}
              >
                <Text style={styles.answerLetter}>{letter}</Text>
                <Text style={styles.answerText}>{answerText}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* EXPLICATION */}
        {showExplanation && (
          <View style={styles.explanationCard}>
            <Text style={styles.explanationTitle}>
              {selectedAnswer === currentQuestion.bonneReponse
                ? "✅ Bonne réponse !"
                : "❌ Mauvaise réponse"}
            </Text>
            <Text style={styles.explanationText}>
              {currentQuestion.explication}
            </Text>

            <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
              <Text style={styles.nextButtonText}>
                {currentIndex < questions.length - 1
                  ? "Question suivante →"
                  : "Voir les résultats 🏆"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
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
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#00d9ff",
    marginBottom: 10,
  },
  progressText: {
    fontSize: 16,
    color: "#e0e0e0",
    marginBottom: 5,
  },
  scoreText: {
    fontSize: 18,
    color: "#ff006e",
    fontWeight: "bold",
  },
  quizContainer: {
    flex: 1,
  },
  questionCard: {
    backgroundColor: "#16213e",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 14,
    color: "#00d9ff",
    marginBottom: 5,
  },
  difficultyText: {
    fontSize: 12,
    color: "#ff006e",
    marginBottom: 15,
  },
  questionText: {
    fontSize: 20,
    color: "#fff",
    lineHeight: 28,
  },
  answersContainer: {
    gap: 12,
  },
  answerButton: {
    backgroundColor: "#0f3460",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  answerButtonSelected: {
    backgroundColor: "#0f3460",
    borderColor: "#00d9ff",
  },
  answerButtonCorrect: {
    backgroundColor: "#1a5f3a",
    borderColor: "#4ade80",
  },
  answerButtonWrong: {
    backgroundColor: "#5f1a1a",
    borderColor: "#f87171",
  },
  answerLetter: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00d9ff",
    marginRight: 12,
    width: 30,
  },
  answerText: {
    fontSize: 16,
    color: "#e0e0e0",
    flex: 1,
  },
  explanationCard: {
    backgroundColor: "#16213e",
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  explanationText: {
    fontSize: 16,
    color: "#e0e0e0",
    lineHeight: 24,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: "#00d9ff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a2e",
  },
  loadingText: {
    color: "#e0e0e0",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  errorText: {
    color: "#ff006e",
    fontSize: 18,
    textAlign: "center",
  },
  finishContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  finishEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  finishTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  finishScore: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#00d9ff",
    marginBottom: 10,
  },
  finishPercentage: {
    fontSize: 24,
    color: "#ff006e",
    marginBottom: 40,
  },
  restartButton: {
    backgroundColor: "#00d9ff",
    borderRadius: 8,
    padding: 16,
    width: "80%",
    alignItems: "center",
    marginBottom: 12,
  },
  restartButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a2e",
  },
  homeButton: {
    backgroundColor: "#0f3460",
    borderRadius: 8,
    padding: 16,
    width: "80%",
    alignItems: "center",
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00d9ff",
  },
});
