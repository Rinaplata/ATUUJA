import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const progressPercentage = 10;

const QuizImageAudioScreen = ({ navigation }) =>  {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const correctOptionIndex = 1;

  const images = [
    require("../../../assets/icons/images/DALL·E-amaca_wayuu.jpg"),
    require("../../../assets/icons/images/DALL·E-sobrero_wayuu.png"),
    require("../../../assets/icons/images/DALL·E-el_viaje_al_pozo_de_agua.png"),
    require("../../../assets/icons/images/DALL·E-la_fiezta_de_la_yonna.png"),
  ];

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
    setIsAnswerChecked(false); 
  };

  const handleCheckAnswer = () => {
    setIsAnswerChecked(true);
    setIsCorrect(selectedOption === correctOptionIndex);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton}
        onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" size={24} color="#BF2D2C" />
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <View
            style={[styles.progressBar, { width: `${progressPercentage}%` }]}
          />
        </View>
      </View>

      {/* Title with Sound Icon */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          <Text>Tepichi</Text>
        </Text>
        <View style={styles.iconBackground}>
          <Ionicons name="volume-high-outline" size={18} color="#862C29" />
        </View>
      </View>

      <Text style={styles.instructionText}>Escoge la opción correcta</Text>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionBox,
              selectedOption === index && styles.selectedOption,
              isAnswerChecked &&
                index === correctOptionIndex &&
                styles.correctOption,
              isAnswerChecked &&
                selectedOption === index &&
                index !== correctOptionIndex &&
                styles.incorrectOption,
            ]}
            onPress={() => handleOptionSelect(index)}
            disabled={isAnswerChecked} // Deshabilitar después de comprobar la respuesta
          >
            <Image source={image} style={styles.imageOption} />
            {isAnswerChecked && index === selectedOption && (
              <Ionicons
                name={
                  index === correctOptionIndex
                    ? "checkmark-circle"
                    : "close-circle"
                }
                size={24}
                color={index === correctOptionIndex ? "#A0D995" : "#BF2D2C"}
                style={styles.feedbackIcon}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Feedback Message */}
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
            {isCorrect ? "¡Correcto!" : "Incorrecto"}
          </Text>
          {!isCorrect && (
            <Text style={styles.correctAnswerText}>Te has equivocado</Text>
          )}
        </View>
      )}

      {/* Check or Continue Button */}
      <TouchableOpacity
        style={[styles.checkButton, isAnswerChecked && styles.continueButton]}
        onPress={
          isAnswerChecked
            ? () => alert("Navegar a la siguiente pantalla")
            : handleCheckAnswer
        }
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
