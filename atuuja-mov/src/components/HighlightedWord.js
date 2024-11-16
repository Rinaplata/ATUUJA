import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const { width } = Dimensions.get('window');

export const HighlightedWord = ({ word, translation, audioUrl }) => {

  const [visible, setVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(null);

  const openTooltip = () => setVisible(true);
  
  const closeTooltip = () => {
    setVisible(false);
    stopAudio();
  };

  const playAudio = async () => {
    try {
      if (audioPlayer === null) {
        const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
        setAudioPlayer(sound);

        await sound.playAsync();
        setIsPlaying(true);

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setIsPlaying(false);
            sound.unloadAsync();
            setAudioPlayer(null);
          }
        });
      } else {
        const status = await audioPlayer.getStatusAsync();
        if (status.isPlaying) {
          await audioPlayer.pauseAsync();
          setIsPlaying(false);
        } else {
          await audioPlayer.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error('Error al reproducir el audio:', error);
    }
  };

  const stopAudio = async () => {
    if (audioPlayer) {
      await audioPlayer.stopAsync();
      await audioPlayer.unloadAsync();
      setAudioPlayer(null);
      setIsPlaying(false);
    }
  };
  
  return (
    <View>
      <TouchableOpacity onPress={openTooltip} style={styles.highlighted}>
        <Text style={styles.highlightedText}>{word}</Text>
      </TouchableOpacity>
      <Modal transparent={true} visible={visible} animationType="fade">
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.closeButton} onPress={closeTooltip}>
            <Ionicons name="close-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.tooltipContainer}>
            <View style={styles.tooltipContent}>
            <TouchableOpacity onPress={playAudio} style={styles.audioButton}>
                <Ionicons
                  name={isPlaying ? "pause-outline" : "play-outline"}
                  size={24}
                  color="#333"
                  style={styles.icon}
                />
              </TouchableOpacity>
              <Text style={styles.tooltipWord}>{word}</Text>
              <Text style={styles.tooltipTranslation}>{translation}</Text>
            </View>
            <View style={styles.tooltipTriangle} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  highlighted: {
    backgroundColor: '#FFD5D5',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  highlightedText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  tooltipContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  tooltipContent: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFD5D5',
    padding: 10,
    borderRadius: 10,
    width: width * 0.6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    marginBottom: 5,
  },
  tooltipWord: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  tooltipTranslation: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  tooltipTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFD5D5',
    alignSelf: 'center',
    marginTop: -1,
  },
});

export default HighlightedWord;
