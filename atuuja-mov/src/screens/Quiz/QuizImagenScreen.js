import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const progressPercentage = 60;

const QuizImagenScreen = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const correctOption = 'Jarara';

  const handleOptionSelect = (option) => {
    if (!isAnswerChecked) {
      setSelectedOption(option);
      setIsAnswerChecked(false);
    }
  };

  const handleCheckButtonPress = () => {
    if (selectedOption) {
      setIsAnswerChecked(true);
      setIsCorrect(selectedOption === correctOption);
    }
  };

  const handleContinue = () => {
    if (isAnswerChecked) {
      navigation.navigate("QuizAudio");
    } else {
    }
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton}
        onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" size={24} color="#BF2D2C" />
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
        </View>
      </View>

      {/* Imagen */}
      <Image 
        source={require("../../../assets/icons/images/DALL·E-amaca_wayuu.jpg")}
        style={styles.imagePlaceholder}
      />

      {/* Instrucción */}
      <Text style={styles.instructionText}>Escoge la opción correcta</Text>

      {/* Opciones */}
      <View style={styles.optionsContainer}>
        {['Jarara', 'Erra', 'Süyaa'].map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option && styles.selectedOptionButton,
              isAnswerChecked && selectedOption === option && 
              (option === correctOption ? styles.correctOptionButton : styles.incorrectOptionButton)
            ]}
            onPress={() => handleOptionSelect(option)}
            disabled={isAnswerChecked}
          >
            <Text style={[
              styles.optionText,
              selectedOption === option && styles.selectedOptionText,
              isAnswerChecked && selectedOption === option && 
              (option === correctOption ? styles.correctOptionText : styles.incorrectOptionText)
            ]}>
              {option}
            </Text>
            <View style={[
              styles.iconContainer,
              selectedOption === option && styles.selectedIconContainer,
              isAnswerChecked && selectedOption === option && 
              (option === correctOption ? styles.correctIconContainer : styles.incorrectIconContainer)
            ]}>
              <Ionicons
                name="volume-high-outline"
                size={18}
                color={selectedOption === option && isAnswerChecked ? "#862C29" : "#333"}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Mensaje de retroalimentación */}
      {isAnswerChecked && (
        <View style={[styles.feedbackMessage, isCorrect ? styles.successMessage : styles.errorMessage]}>
          <Ionicons
            name={isCorrect ? "checkmark-circle" : "close-circle"}
            size={24}
            color="#333333"
          />
          <Text style={styles.feedbackText}>
            {isCorrect ? "¡Bien hecho! Has elegido bien" : "Incorrecto"}
          </Text>
          {!isCorrect && (
            <Text style={styles.correctAnswerText}>Respuesta correcta: <Text style={{ fontWeight: 'bold' }}>{correctOption}</Text></Text>
          )}
        </View>
      )}

      {/* Botón de acción */}
      <TouchableOpacity
        style={[styles.checkButton, isAnswerChecked && styles.continueButton]}
        onPress={isAnswerChecked ? handleContinue : handleCheckButtonPress}
      >
        <Text style={styles.checkButtonText}>{isAnswerChecked ? "Continuar" : "Comprobar"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBECE8',
    paddingHorizontal: 20,
    paddingVertical: height * 0.06,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  closeButton: {
    backgroundColor: '#FFD1CA',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    width: 109,
    backgroundColor: '#FFD1CA',
    borderRadius: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#E97C71',
    borderRadius: 4,
  },
  imagePlaceholder: {
    width: width * 0.5,
    height: width * 0.5,
    backgroundColor: '#FBCAC1',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFB3AA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  selectedOptionButton: {
    backgroundColor: '#E97C71',
    borderWidth: 2,
    borderColor: '#862C29',
  },
  correctOptionButton: {
    backgroundColor: '#E97C71',
    borderColor: '#862C29',
  },
  incorrectOptionButton: {
    backgroundColor: '#FFD1CA',
    borderColor: '#862C29',
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  correctOptionText: {
    color: '#FFFFFF',
  },
  incorrectOptionText: {
    color: '#333',
  },
  iconContainer: {
    backgroundColor: '#FFD1CA',
    padding: 10,
    borderRadius: 15,
  },
  selectedIconContainer: {
    backgroundColor: '#FFB3AA',
  },
  correctIconContainer: {
    backgroundColor: '#FFB3AA',
  },
  incorrectIconContainer: {
    backgroundColor: '#FFD1CA',
  },
  feedbackMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  successMessage: {
    backgroundColor: '#A0D995',
  },
  errorMessage: {
    backgroundColor: '#FFD1CA',
  },
  successText: {
    color: '#333333',
    fontWeight: 'bold',
  },  
  feedbackText: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 10,
  },
  correctAnswerText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  checkButton: {
    backgroundColor: '#862C29',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 50,
  },
  continueButton: {
    backgroundColor: '#862C29',
  },
  checkButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizImagenScreen;
