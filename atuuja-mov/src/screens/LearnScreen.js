import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  PixelRatio,
  SafeAreaView,
} from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";
import { useStories } from "../context/StoryContext";

const { width, height } = Dimensions.get("window");

const LearnScreen = ({ navigation, route }) => {
  const { RelatoId } = route.params || {};
  const { stories, loadingStory, errorStory } = useStories();
  const [story, setStory] = useState(null);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!RelatoId) {
      console.error("RelatoId no proporcionado en los parámetros");
      return;
    }
    if (stories) {
      const selectedStory = stories.find((s) => s.RelatoId === RelatoId);
      setStory(selectedStory);
    }
  }, [stories, RelatoId]);

  useEffect(() => {
    return () => {
      if (audioPlayer) {
        audioPlayer.unloadAsync();
      }
    };
  }, [audioPlayer]);

  const playPauseAudio = async () => {
    if (audioPlayer === null && story?.AudioUrl) {
      const { sound } = await Audio.Sound.createAsync({ uri: story.AudioUrl });
      setAudioPlayer(sound);
      setIsPlaying(true);
      await sound.playAsync();
    } else if (isPlaying) {
      setIsPlaying(false);
      await audioPlayer.pauseAsync();
    } else {
      setIsPlaying(true);
      await audioPlayer.playAsync();
    }
  };

  const highlightContent = (content, highlights) => {
    if (!content || !highlights) return content;

    const words = content.split(" ");
    return words.map((word, index) => {
      const cleanWord = word.replace(/[\.,]/g, ""); // Remove punctuation
      if (highlights.includes(cleanWord)) {
        return (
          <Text key={index} style={styles.highlighted}>
            {word + " "}
          </Text>
        );
      }
      return word + " ";
    });
  };

  if (loadingStory) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando relato...</Text>
      </View>
    );
  }

  if (errorStory || !story) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          {errorStory || "Relato no encontrado"}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.storyContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: story.ImageUrl }} style={styles.storyImage} />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close-outline" size={scaleFontSize(24)} color="#A43B36" />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.textContainer}>
          <Text style={styles.storyText}>
            {highlightContent(story.Contenido, story.PalabrasResaltadas)}
          </Text>
        </ScrollView>

        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={playPauseAudio}>
            <Ionicons
              name={isPlaying ? "pause-outline" : "play-outline"}
              size={24}
              color={colors.iconColor}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate("QuizImagen")}
        >
          <Text style={styles.continueText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const scaleFontSize = (size) => size * PixelRatio.getFontScale();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0ED",
  },
  storyContainer: {
    flex: 1,
    backgroundColor: "#FFF0ED",
    paddingTop: height * 0.02,
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
    height: height * 0.4,
    marginTop: height * 0.02,
  },
  storyImage: {
    width: "100%",
    height: "105%",
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(255, 200, 200, 1)",
    padding: width * 0.02,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    fontSize: scaleFontSize(16),
    fontWeight: "bold",
    color: "#E56363",
  },
  textContainer: {
    padding: width * 0.04,
    backgroundColor: "#FFF0ED",
    borderRadius: 10,
    flexGrow: 1,
    marginTop: height * 0.02,
  },
  storyText: {
    fontSize: scaleFontSize(20),
    lineHeight: scaleFontSize(28),
    color: "#333",
  },
  highlighted: {
    backgroundColor: "#FFD5D5",
    paddingHorizontal: width * 0.02,
    borderRadius: 4,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: height * 0.01,
  },
  iconButton: {
    backgroundColor: "rgba(255, 200, 200, 0.7)",
    padding: width * 0.03,
    borderRadius: 15,
    marginHorizontal: width * 0.02,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButton: {
    backgroundColor: "#9A2C2B",
    paddingVertical: height * 0.02,
    alignItems: "center",
    margin: width * 0.04,
    borderRadius: 8,
  },
  continueText: {
    color: "#FFF",
    fontSize: scaleFontSize(16),
    fontWeight: "bold",
  },
});

export default LearnScreen;
