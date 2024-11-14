import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useQuizzes } from "../../context/QuizContext";

const { width, height } = Dimensions.get("window");

const QuizTextScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { quizzes, loading, error } = useQuizzes();

  const { RelatoId, totalPoints: initialPoints = 0, initialCorrect = 0, initialIncorrect = 0,
    correctAnswers: currentCorrect = 0,
    incorrectAnswers: currentIncorrect = 0,
   } =
    route.params || {};
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [totalPoints, setTotalPoints] = useState(initialPoints);
  const [correctAnswers, setCorrectAnswers] = useState(
    initialCorrect || currentCorrect
  );
  const [incorrectAnswers, setIncorrectAnswers] = useState(
    initialIncorrect || currentIncorrect
  );

  useEffect(() => {
    if (quizzes && RelatoId) {
      const quiz = quizzes.find((q) => q.RelatoId === RelatoId);
      if (quiz) {
        const textQuestions = quiz.Preguntas.filter(
          (pregunta) => pregunta.TipoPregunta === 0
        );
        setCurrentQuiz({ ...quiz, Preguntas: textQuestions });
      } else {
        console.error(`No se encontró un quiz con el RelatoId: ${RelatoId}`);
      }
    }
  }, [quizzes, RelatoId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando preguntas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error al cargar las preguntas: {error}</Text>
      </View>
    );
  }

  if (!currentQuiz || !currentQuiz.Preguntas.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          No se encontraron preguntas del tipo esperado (TipoPregunta: 0).
        </Text>
      </View>
    );
  }

  const currentQuestion = currentQuiz.Preguntas[currentQuestionIndex];
  const correctOption = currentQuestion.Respuestas.find((r) => r.EsCorrecta)?.Valor;

  const handleOptionSelect = (option) => {
    if (!isAnswerChecked) {
      setSelectedOption(option);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedOption) {
      const isAnswerCorrect = selectedOption === correctOption;
      setIsAnswerChecked(true);
      setIsCorrect(isAnswerCorrect);

      // Actualizar los puntos y las respuestas correctas/incorrectas
      if (isAnswerCorrect) {
        setTotalPoints((prevPoints) => prevPoints + currentQuestion.Puntos);
        setCorrectAnswers((prev) => prev + 1);
      } else {
        setIncorrectAnswers((prev) => prev + 1);
      }
    }
  };

  const handleContinue = () => {
    if (isAnswerChecked) {
      if (currentQuestionIndex < currentQuiz.Preguntas.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOption(null);
        setIsAnswerChecked(false);
        setIsCorrect(false);
      } else {
        navigation.navigate("ResultScreen", {
          RelatoId,
          totalPoints,
          correctAnswers,
          incorrectAnswers,
        });
      }
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close-outline" size={24} color="#BF2D2C" />
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${
                  ((currentQuestionIndex + 1) / currentQuiz.Preguntas.length) * 100
                }%`,
              },
            ]}
          />
        </View>
      </View>

      {/* Question */}
      <Text style={styles.questionText}>{currentQuestion.EnunciadoPregunta}</Text>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {currentQuestion.Respuestas.map((respuesta, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === respuesta.Valor && styles.selectedOptionButton,
              isAnswerChecked &&
                respuesta.Valor === correctOption &&
                styles.correctOptionButton,
              isAnswerChecked &&
                selectedOption === respuesta.Valor &&
                selectedOption !== correctOption &&
                styles.incorrectOptionButton,
            ]}
            onPress={() => handleOptionSelect(respuesta.Valor)}
            disabled={isAnswerChecked}
          >
            <Text style={styles.optionText}>{respuesta.Valor}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Feedback */}
      {isAnswerChecked && (
        <View
          style={[
            styles.feedbackMessage,
            isCorrect ? styles.successMessage : styles.errorMessage,
          ]}
        >
          <Ionicons
            name={isCorrect ? "checkmark-circle" : "close-circle"}
            size={24}
            color="#333333"
          />
          <Text style={styles.feedbackText}>
            {isCorrect ? "¡Correcto!" : "Respuesta incorrecta."}
          </Text>
          {!isCorrect && (
            <Text style={styles.correctAnswerText}>
              Respuesta correcta:{" "}
              <Text style={{ fontWeight: "bold" }}>{correctOption}</Text>
            </Text>
          )}
        </View>
      )}

      {/* Action Button */}
      <TouchableOpacity
        style={[styles.checkButton, isAnswerChecked && styles.continueButton]}
        onPress={isAnswerChecked ? handleContinue : handleCheckAnswer}
        disabled={selectedOption === null}
      >
        <Text style={styles.checkButtonText}>
          {isAnswerChecked ? "Continuar" : "Comprobar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBECE8",
    paddingHorizontal: 20,
    paddingVertical: height * 0.07,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.03,
  },
  closeButton: {
    backgroundColor: "#FFD1CA",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    width: 109,
    backgroundColor: "#FFD1CA",
    borderRadius: 4,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#E97C71",
    borderRadius: 4,
  },
  questionText: {
    fontSize: 21,
    fontWeight: "600",
    color: "#333333",
    textAlign: "left",
  },
  optionsContainer: {
    flex: 1,
    justifyContent: "space-around",
    marginVertical: 130,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFB3AA",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginVertical: 5,
  },
  selectedOptionButton: {
    backgroundColor: "#E97C71",
    borderWidth: 2,
    borderColor: "#862C29",
  },
  correctOptionButton: {
    backgroundColor: "#E97C71",
    borderColor: "#862C29",
  },
  incorrectOptionButton: {
    backgroundColor: "#FFD1CA",
    borderColor: "#862C29",
  },
  optionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  selectedOptionText: {
    color: "#FFFFFF",
  },
  correctOptionText: {
    color: "#FFFFFF",
  },
  incorrectOptionText: {
    color: "#333",
  },
  feedbackMessage: {
    flexDirection: "row",
    alignItems: "center",
    padding: 9,
    borderRadius: 10,
    marginVertical: 8,
  },
  successMessage: {
    backgroundColor: "#A0D995",
  },
  errorMessage: {
    backgroundColor: "#FFD1CA",
  },
  feedbackText: {
    fontSize: 16,
    color: "#333333",
  },
  correctAnswerText: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  iconContainer: {
    backgroundColor: '#FFD1CA',
    padding: 10,
    borderRadius: 15,
  },
  checkButton: {
    backgroundColor: '#862C29',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 50,
  },
  continueButton: {
    backgroundColor: "#BF2D2C",
  },
  correctIconContainer: {
    backgroundColor: '#FFB3AA',
  },
  incorrectIconContainer: {
    backgroundColor: '#FFD1CA',
  },
  checkButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default QuizTextScreen;
