import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  PixelRatio,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useStories } from "../context/StoryContext";

const { width, height } = Dimensions.get("window");

const StoryIntroScreen = ({ navigation, route  }) => {
  const { RelatoId } = route.params || {};
  const { stories, loadingStory, errorStory } = useStories();
  const [story, setStory] = useState(null);


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
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={scaleSize(25)} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image
         source={{ uri: story?.ImageUrl || "https://atuuja.blob.core.windows.net/audios/words/Jintut (niña).ogg" }}      
        style={styles.storyImage}
        />
      </View>

      <View style={styles.containerText}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Relato</Text>
          <Text style={styles.subtitle}>{story.Titulo}</Text>
          <Text style={styles.subsecondtitle}>{story.Subtitle}</Text>
          <Text style={styles.description}>
          Este relato describe las costumbres, tradiciones y vivencias únicas del pueblo Wayuu, reflejando la conexión espiritual con la naturaleza, su cultura ancestral y las historias que han pasado de generación en generación.
          </Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="book-outline" size={scaleSize(18)} color="#FFF" />
          </View>
          <View style={styles.textAndProgress}>
            <Text style={styles.progressText}>Lectura</Text>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => {
          if (story?.RelatoId) {
            navigation.navigate("LearnStart", { RelatoId: story.RelatoId });
            console.log("RelatoId recibido:", RelatoId);
          } else {
            console.error("RelatoId no encontrado en stories");
          }
        }}      >
        <Text style={styles.startButtonText}>Comenzar</Text>
        <View style={styles.iconCircle}>
          <Ionicons name="book-outline" size={scaleSize(18)} color="#FFF" />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const scaleSize = (size) => size * PixelRatio.getFontScale();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A43B36",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: height * 0.03,
    justifyContent: "space-between",
  },
  header: {
    position: "absolute",
    top: height * 0.02,
    left: width * 0.05,
    zIndex: 1,
    paddingVertical: height * 0.02,
  },
  closeButton: {
    padding: width * 0.02,
    backgroundColor: "#9A2C2B",
    borderRadius: 20,
    marginTop: 16,
  },
  imageContainer: {
    alignItems: "center",
    width: width * 0.9,
    height: height * 0.4,
    marginTop: height * 0.0999,
  },
  storyImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    resizeMode: "cover",
  },
  containerText: {
    flex: 1,
    alignItems: "center",
    width: width * 0.9,
    paddingHorizontal: width * 0.02,
  },
  contentContainer: {
    alignItems: "center",
    marginTop: height * 0.02,
    marginBottom: height * 0.06,
  },
  title: {
    fontSize: scaleSize(20),
    color: "#FDFDFD",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 2,
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: scaleSize(32),
    color: "#FDFDFD",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 1,
  },
  subsecondtitle: {
    fontSize: scaleSize(14),
    color: "#FDFDFD",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: scaleSize(16),
    color: "#FDFDFD",
    textAlign: "center",
    lineHeight: scaleSize(20),
    marginTop: 8,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    width: "90%",
    marginBottom: height * 0.03,
  },
  iconCircle: {
    width: scaleSize(32),
    height: scaleSize(32),
    borderRadius: scaleSize(16),
    backgroundColor: "#BF4D47",
    alignItems: "center",
    justifyContent: "center",
    marginRight: width * 0.03,
  },
  textAndProgress: {
    flex: 1,
  },
  progressText: {
    fontSize: scaleSize(18),
    color: "#FFF",
    marginLeft: width * 0.03,
  },
  progressBar: {
    flex: 1,
    height: height * 0.01,
    backgroundColor: "#D3D3D3",
    borderRadius: 5,
    marginLeft: width * 0.02,
    overflow: "hidden",
  },
  progressFill: {
    width: "50%",
    height: "100%",
    backgroundColor: "#F69090",
  },
  startButton: {
    position: "absolute",
    bottom: 20,
    left: width * 0.05,
    right: width * 0.05,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#9A2C2B",
    paddingVertical: height * 0.02,
    borderRadius: 15,
    justifyContent: "center",
  },
  startButtonText: {
    color: "#FFF",
    fontSize: scaleSize(16),
    fontWeight: "bold",
    marginRight: width * 0.02,
  },
});

export default StoryIntroScreen;
