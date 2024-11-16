import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export const HighlightedWord = ({ word, translation }) => {
  const [visible, setVisible] = useState(false);

  const openTooltip = () => setVisible(true);
  const closeTooltip = () => setVisible(false);

  return (
    <View>
      <TouchableOpacity onPress={openTooltip} style={styles.highlighted}>
        <Text style={styles.highlightedText}>{word}</Text>
      </TouchableOpacity>
      <Modal transparent={true} visible={visible} animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={closeTooltip}>
          <View style={styles.tooltipContainer}>
            <View style={styles.tooltipContent}>
              <Ionicons name="volume-high-outline" size={24} color="#333" style={styles.icon} />
              <Text style={styles.tooltipWord}>{word}</Text>
              <Text style={styles.tooltipTranslation}>{translation}</Text>
            </View>
            <View style={styles.tooltipTriangle} />
          </View>
        </TouchableOpacity>
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
