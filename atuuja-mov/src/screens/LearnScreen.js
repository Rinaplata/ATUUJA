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
import { HighlightedWord } from "../components/HighlightedWord";
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
    try {
      if (audioPlayer === null && story?.AudioUrl) {
        // Cargar el audio por primera vez
        const { sound } = await Audio.Sound.createAsync({
          uri: story.AudioUrl,
        });
        setAudioPlayer(sound);

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setIsPlaying(false); // Audio terminó
            sound.setPositionAsync(0); // Reiniciar posición
          }
        });

        setIsPlaying(true);
        await sound.playAsync();
      } else if (audioPlayer) {
        const status = await audioPlayer.getStatusAsync();

        if (status.isLoaded) {
          if (isPlaying) {
            await audioPlayer.pauseAsync();
            setIsPlaying(false);
          } else {
            await audioPlayer.playAsync();
            setIsPlaying(true);
          }
        } else {
          console.error("El audio no está cargado correctamente.");
        }
      }
    } catch (error) {
      console.error("Error al manejar el audio:", error);
    }
  };

  const highlightContent = (content, palabrasResaltadas) => {
    if (!content || !palabrasResaltadas || palabrasResaltadas.length === 0) return content;
  
    // Divide el contenido en palabras
    const words = content.split(" ");
  
    return words.map((word, index) => {
      // Limpia la palabra actual (remueve puntuación y espacios extra)
      const cleanWord = word.trim().replace(/[\.,]/g, "").toLowerCase();
  
      // Encuentra una coincidencia exacta en palabras resaltadas
      const matchedWord = palabrasResaltadas.find(
        (resaltada) => resaltada.Palabra.trim().toLowerCase() === cleanWord
      );
  
      // Si hay coincidencia, renderiza el componente HighlightedWord
      if (matchedWord) {
        return (
          <HighlightedWord
            key={index}
            word={matchedWord.Palabra}
            translation={matchedWord.Traduccion}
            audioUrl={matchedWord.AudioUrl}
          />
        );
      }
  
      // Si no hay coincidencia, renderiza la palabra como texto normal
      return <Text key={index}>{word + " "}</Text>;
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
            <Ionicons
              name="close-outline"
              size={scaleFontSize(24)}
              color="#A43B36"
            />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.textContainer}>
        <View style={styles.contentContainerText}>
  <Text style={styles.storyText}>
    {highlightContent(story.Contenido, story.PalabrasResaltadas)}
  </Text>
</View>

          <View style={styles.translationContainer}>
            <Text style={styles.translationText}>{story.Traduccion}</Text>
          </View>
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
          onPress={() => {
            navigation.navigate("QuizImagen", { RelatoId: story.RelatoId });
          }}
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
  contentContainerText: {
    marginBottom: height * 0.02,
  },
  translationContainer: {
    paddingTop: height * 0.01,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    marginTop: height * 0.02,
  },
  translationTitle: {
    fontSize: scaleFontSize(16),
    fontWeight: "bold",
    color: "#9A2C2B",
    marginBottom: height * 0.01,
  },
  translationText: {
    fontSize: scaleFontSize(14),
    lineHeight: scaleFontSize(20),
    color: "#555",
  },
});

export default LearnScreen;
