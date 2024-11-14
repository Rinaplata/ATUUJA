import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useQuizzes } from "../../context/QuizContext";

const { width, height } = Dimensions.get("window");

const QuizImagenScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { quizzes, loading, error } = useQuizzes();

  const {
    RelatoId,
    totalPoints: initialPoints = 0,
    initialCorrect = 0,
    initialIncorrect = 0,
    correctAnswers: currentCorrect = 0,
    incorrectAnswers: currentIncorrect = 0,
  } = route.params || {};
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
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
        const questionsOfType2 = quiz.Preguntas.filter(
          (pregunta) => pregunta.TipoPregunta === 2
        );
        setCurrentQuiz(quiz);
        setFilteredQuestions(questionsOfType2);
      } else {
        console.error(`No se encontró un quiz con el RelatoId: ${RelatoId}`);
      }
    }
  }, [quizzes, RelatoId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando quizzes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Error al cargar los quizzes: {error}
        </Text>
      </View>
    );
  }

  if (!filteredQuestions.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          No se encontraron preguntas del tipo esperado (TipoPregunta: 2).
        </Text>
      </View>
    );
  }

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const correctOption = currentQuestion.Respuestas.find(
    (r) => r.EsCorrecta
  )?.Valor;
  const pointsForQuestion = currentQuestion.Puntos; // Puntos asignados a la pregunta

  const handleOptionSelect = (option) => {
    if (!isAnswerChecked) {
      setSelectedOption(option);
    }
  };

  const handleCheckButtonPress = () => {
    if (selectedOption) {
      const isAnswerCorrect = selectedOption === correctOption;
      setIsAnswerChecked(true);
      setIsCorrect(isAnswerCorrect);

      // Actualizar puntos y conteos de respuestas
      if (isAnswerCorrect) {
        setTotalPoints((prevPoints) => prevPoints + pointsForQuestion);
        setCorrectAnswers((prev) => prev + 1);
      } else {
        setIncorrectAnswers((prev) => prev + 1);
      }
    }
  };

  const handleContinue = () => {
    if (isAnswerChecked) {
      if (currentQuestionIndex < filteredQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        resetState();
      } else {
        navigation.navigate("QuizAudio", {
          RelatoId,
          totalPoints,
          correctAnswers,
          incorrectAnswers,
        });
        console.log("Passing to QuizAudio:", {
          RelatoId,
          totalPoints,
          correctAnswers,
          incorrectAnswers,
        });
      }
    }
  };

  const resetState = () => {
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
  };

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
                  ((currentQuestionIndex + 1) / filteredQuestions.length) * 100
                }%`,
              },
            ]}
          />
        </View>
      </View>

      {/* Image */}
      {currentQuestion.ArchivoPregunta ? (
        <Image
          source={{ uri: currentQuestion.ArchivoPregunta }}
          style={styles.imagePlaceholder}
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.errorText}>Imagen no disponible</Text>
        </View>
      )}

      {/* Question */}
      <Text style={styles.instructionText}>
        {currentQuestion.EnunciadoPregunta}
      </Text>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {currentQuestion.Respuestas.map((respuesta, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === respuesta.Valor && styles.selectedOptionButton,
              isAnswerChecked &&
                selectedOption === respuesta.Valor &&
                (respuesta.EsCorrecta
                  ? styles.correctOptionButton
                  : styles.incorrectOptionButton),
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
            {isCorrect ? "¡Bien hecho!" : "Respuesta incorrecta."}
          </Text>
        </View>
      )}

      {/* Action Button */}
      <TouchableOpacity
        style={[styles.checkButton, isAnswerChecked && styles.continueButton]}
        onPress={isAnswerChecked ? handleContinue : handleCheckButtonPress}
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
    paddingVertical: height * 0.06,
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
    backgroundColor: "#FFD1CA",
    borderRadius: 4,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#E97C71",
    borderRadius: 4,
  },
  pointsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: width * 0.8,
    height: width * 0.5,
    backgroundColor: "#FBCAC1",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    textAlign: "center",
    marginBottom: 20,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: "space-around",
    marginVertical: 20,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFB3AA",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  selectedOptionButton: {
    backgroundColor: "#E97C71",
    borderWidth: 2,
    borderColor: "#862C29",
  },
  correctOptionButton: {
    backgroundColor: "#A0D995",
  },
  incorrectOptionButton: {
    backgroundColor: "#FFD1CA",
  },
  feedbackMessage: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
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
    marginLeft: 10,
  },
  checkButton: {
    backgroundColor: "#862C29",
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  continueButton: {
    backgroundColor: "#862C29",
  },
  checkButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default QuizImagenScreen;
