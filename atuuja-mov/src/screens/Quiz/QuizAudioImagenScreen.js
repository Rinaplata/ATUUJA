import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useQuizzes } from "../../context/QuizContext";


const { width, height } = Dimensions.get("window");

const QuizImageAudioScreen = () => {
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
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
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
        const audioQuestions = quiz.Preguntas.filter(
          (pregunta) => pregunta.TipoPregunta === 1
        );
        setCurrentQuiz({ ...quiz, Preguntas: audioQuestions });
      } else {
        console.error(`No se encontró un quiz con el RelatoId: ${RelatoId}`);
      }
    }
  }, [quizzes, RelatoId]);

  const playAudio = async () => {
    try {
      if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
          return;
        } else if (status.isLoaded) {
          await sound.playAsync();
          setIsPlaying(true);
          return;
        }
      }

      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: currentQuiz?.Preguntas[currentQuestionIndex]?.ArchivoPregunta,
      });
      setSound(newSound);
      setIsPlaying(true);
      await newSound.playAsync();
    } catch (error) {
      console.error("Error al manejar el audio:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
      }
    };
  }, [sound, currentQuestionIndex]);

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
          No se encontraron preguntas del tipo esperado (TipoPregunta: 1).
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
      const pointsForQuestion = currentQuestion.Puntos; // Puntos de la pregunta actual
      const isAnswerCorrect = selectedOption === correctOption;
      setIsAnswerChecked(true);
      setIsCorrect(isAnswerCorrect);

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
      if (currentQuestionIndex < currentQuiz.Preguntas.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOption(null);
        setIsAnswerChecked(false);
        setIsCorrect(false);
      } else {
        navigation.navigate("QuizText", {
          RelatoId,
          totalPoints, // Pass updated total points
          correctAnswers, // Pass cumulative correct answers
          incorrectAnswers, // Pass cumulative incorrect answers
        });
      }
    }
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
                  ((currentQuestionIndex + 1) / currentQuiz.Preguntas.length) * 100
                }%`,
              },
            ]}
          />
        </View>
      </View>

      {/* Audio Question */}
      <View style={styles.audioContainer}>
        <TouchableOpacity style={styles.playButton} onPress={playAudio}>
          <Ionicons
            name={isPlaying ? "pause-circle-outline" : "play-circle-outline"}
            size={40}
            color="#862C29"
          />
        </TouchableOpacity>
        <Text style={styles.instructionText}>
          {currentQuestion.EnunciadoPregunta}
        </Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {currentQuestion.Respuestas.map((respuesta, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionBox,
              selectedOption === respuesta.Valor && styles.selectedOption,
              isAnswerChecked &&
                respuesta.Valor === correctOption &&
                styles.correctOption,
              isAnswerChecked &&
                selectedOption === respuesta.Valor &&
                selectedOption !== correctOption &&
                styles.incorrectOption,
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
    width: 109,
    backgroundColor: "#FFD1CA",
    borderRadius: 4,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#E97C71",
    borderRadius: 4,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  titleText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    marginRight: 10,
  },
  iconBackground: {
    backgroundColor: "#FFD1CA",
    borderRadius: 20,
    padding: 5,
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  instructionText: {
    fontSize: 21,
    fontWeight: "600",
    color: "#333333",
    textAlign: "left",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  optionBox: {
    width: width * 0.42,
    height: width * 0.42,
    backgroundColor: "#FBCAC1",
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  imageOption: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  selectedOption: {
    borderColor: "#862C29",
    borderWidth: 2,
  },
  correctOption: {
    borderColor: "#A0D995",
    borderWidth: 2,
  },
  incorrectOption: {
    borderColor: "#BF2D2C",
    borderWidth: 2,
  },
  feedbackIcon: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  feedbackMessage: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
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
  correctAnswerText: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  checkButton: {
    backgroundColor: "#862C29",
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  continueButton: {
    backgroundColor: "#BF2D2C",
  },
  checkButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default QuizImageAudioScreen;
