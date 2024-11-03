import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const progressPercentage = 60; // Ejemplo de progreso, puedes ajustarlo según sea necesario

const QuizImagenScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton}>
          <Ionicons name="close-outline" size={24} color="#BF2D2C" />
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
        </View>
      </View>

      {/* Image */}
      <Image 
        source={require("../../../assets/icons/images/DALL·E-amaca_wayuu.jpg")}
        style={styles.imagePlaceholder}
      />

      {/* Instruction */}
      <Text style={styles.instructionText}>Escoge la opción correcta</Text>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {['Jarara', 'Erra', 'Süyaa'].map((option, index) => (
          <TouchableOpacity key={index} style={styles.optionButton}>
            <Text style={styles.optionText}>{option}</Text>
            <View style={styles.iconContainer}>
              <Ionicons name="volume-high-outline" size={18} color="#862C29" />
            </View>
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
    paddingHorizontal: 20,
    paddingVertical: height * 0.05,
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
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  iconContainer: {
    backgroundColor: '#FFD1CA',
    padding: 10,
    borderRadius: 15,
  },
  checkButton: {
    backgroundColor: '#E97C71',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 100
  },
  checkButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizImagenScreen;
