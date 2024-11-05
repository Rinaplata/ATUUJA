import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const QuizTextScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton}>
          <Ionicons name="close-outline" size={24} color="#BF2D2C" />
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar} />
        </View>
      </View>

      {/* Question Text */}
      <Text style={styles.questionText}>¿Cómo se escribe "Pozo"?</Text>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {['Jarara', 'Erra', 'Süyaa'].map((option, index) => (
          <TouchableOpacity key={index} style={styles.optionButton}>
            <Text style={styles.optionText}>{option}</Text>
            <Ionicons name="volume-high-outline" size={20} color="#BF2D2C" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Check Button */}
      <TouchableOpacity style={styles.checkButton}>
        <Text style={styles.checkButtonText}>Comprobar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBECE8',
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#FBECE8',
    padding: 8,
    borderRadius: 15,
  },
  progressBarContainer: {
    flex: 1,
    height: 4,
    backgroundColor: '#FBCAC1',
    borderRadius: 2,
    marginLeft: 10,
  },
  progressBar: {
    width: '50%',
    height: '100%',
    backgroundColor: '#BF2D2C',
    borderRadius: 2,
  },
  questionText: {
    fontSize: 18,
    color: '#BF2D2C',
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
    backgroundColor: '#FBCAC1',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  checkButton: {
    backgroundColor: '#862C29',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  checkButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizTextScreen;
