import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, PixelRatio, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import HighlightedWord from '../components/HighlightedWord';

const { width, height } = Dimensions.get('window');

const LearnScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StoryScreen />
    </SafeAreaView>
  );
};

const StoryScreen = () => {
  return (
    <View style={styles.storyContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/icons/images/DALL·E-la_fiezta_de_la_yonna.png')}
          style={styles.storyImage}
        />
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.textContainer}>
        <Text style={styles.storyText}>
          Jine aa inepoika, shu waala püsüjaa Wayuu siamaakaa sümaa irüin kaapu ma’iraa shiirüin süyaa.
          <HighlightedWord word="ülükü" translation="pájaros" />
        </Text>
        <Text style={styles.storyText}>
          Pülee irüin waa shia aa pia chii, pia kütüiki kuu ka'rii 
          <HighlightedWord word="ülükü" translation="pájaros" /> ma'iraa jialeiraa shiirüin wayüünika.
        </Text>
      </ScrollView>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="volume-high-outline" size={24} color={colors.iconColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="pause-outline" size={24} color={colors.iconColor} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

const scaleFontSize = (size) => size * PixelRatio.getFontScale();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.principal,
  },
  storyContainer: {
    flex: 1,
    backgroundColor: '#FDEAE5',
    paddingTop: height * 0.02,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    height: height * 0.4,
    marginTop: height * 0.02,
  },
  storyImage: {
    width: '100%',
    height: '105%',
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FFF',
    padding: width * 0.02,
    borderRadius: 15,
  },
  closeText: {
    fontSize: scaleFontSize(16),
    fontWeight: 'bold',
    color: '#E56363',
  },
  textContainer: {
    padding: width * 0.04,
    backgroundColor: '#FFF',
    borderRadius: 10,
    flexGrow: 1,
    marginTop: height * 0.02,
  },
  storyText: {
    fontSize: scaleFontSize(20),
    lineHeight: scaleFontSize(28),
    color: '#333',
  },
  highlighted: {
    backgroundColor: '#FFD5D5',
    paddingHorizontal: width * 0.02,
    borderRadius: 4,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: height * 0.01,
  },
  iconButton: {
    padding: width * 0.02,
  },
  continueButton: {
    backgroundColor: '#E56363',
    paddingVertical: height * 0.02,
    alignItems: 'center',
    margin: width * 0.02,
    borderRadius: 8,
  },
  continueText: {
    color: '#FFF',
    fontSize: scaleFontSize(16),
    fontWeight: 'bold',
  },
});

export default LearnScreen;
