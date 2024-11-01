import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const QuizImageAudioScreen = () => {
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

      {/* Title with Sound Icon */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Süyaa</Text>
        <Ionicons name="volume-high-outline" size={24} color="#BF2D2C" style={styles.soundIcon} />
      </View>
      <Text style={styles.instructionText}>Escoge la opción correcta</Text>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionBox} />
        <TouchableOpacity style={styles.optionBox} />
        <TouchableOpacity style={styles.optionBox} />
        <TouchableOpacity style={styles.optionBox} />
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
    width: '50%', // Ajusta el progreso aquí
    height: '100%',
    backgroundColor: '#BF2D2C',
    borderRadius: 2,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#BF2D2C',
    marginRight: 10,
  },
  soundIcon: {
    padding: 5,
  },
  instructionText: {
    fontSize: 18,
    color: '#BF2D2C',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionBox: {
    width: width * 0.4,
    height: width * 0.4,
    backgroundColor: '#FBCAC1',
    borderRadius: 10,
    marginBottom: 20,
  },
  checkButton: {
    backgroundColor: '#BF2D2C',
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

export default QuizImageAudioScreen;
