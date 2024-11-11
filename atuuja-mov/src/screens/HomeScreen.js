import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import Carousel from "react-native-reanimated-carousel";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";

const { width: viewportWidth } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const { user: authUser } = useAuth();
  const { progress, fetchUserProgress, loading, error } = useProgress();

  useEffect(() => {
    if (authUser?.userId) {
      fetchUserProgress(authUser.userId);
    }
  }, [authUser]);

if (loading) {
  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Cargando progreso...</Text>
    </View>
  );
}

if (error) {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Error: {error}</Text>
    </View>
  );
}

  const data = [
    {
      title: "El viaje al pozo de agua",
      description: "Un fascinante relato sobre la vida en la naturaleza.",
      image: require("../../assets/icons/images/DALL·E-la_fiezta_de_la_yonna.png"),
    },
    {
      title: "La Fiesta de la Yonna",
      description: "Una celebración llena de cultura y tradición.",
      image: require("../../assets/icons/images/DALL·E-el_viaje_al_pozo_de_agua.png"),
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <ImageBackground
        source={item.image}
        imageStyle={styles.cardImage}
        style={styles.relatoCard}
      >
        <View style={styles.overlay}>
          <Text style={styles.relatoTitle}>{item.title}</Text>
          <Text style={styles.relatoSubtitle}>{item.description}</Text>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => navigation.navigate("Learn")}
          >
            <Text style={styles.startButtonText}>Comenzar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
  const puntosAcumulados = progress?.progress?.[0]?.PuntosAcumulados || 0;
  const maxPuntos = 100;
  const percentage = Math.min((puntosAcumulados / maxPuntos) * 100, 100);

  return (
    <View style={styles.container}>
      {loading && <Text style={styles.loadingText}>Cargando progreso...</Text>}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
      <View style={styles.topMenu}>
        <View style={styles.pointsContainer}>
          <Image
            source={require("../../assets/icons/images/spiral-icon.png")}
            style={[styles.pointsIcon, { width: 28, height: 28 }]}
          />
          <Text style={styles.pointsText}>{puntosAcumulados}</Text>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/icons/images/isologoBanner.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.progressContainer}>
          <CircularProgress
            value={percentage}
            radius={16}
            titleFontSize={16}
            progressValueColor={"#9A2C2B"}
            progressValueStyle={{ fontSize: 16, color: "#9A2C2B" }}
            activeStrokeColor={"#E97C71"}
            strokeWidth={8}
            backgroundWidth={8}
            inActiveStrokeColor={"#FFF0ED"}
            circleBackgroundColor={"#FFF0ED"}
            textColor={"#9A2C2B"}
            titleColor={"#9A2C2B"}
          />
        </View>
      </View>

      <View style={styles.containerBody}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.cardSubtitle}>Bienvenido de vuelta,</Text>
          <Text style={styles.welcomeText}>
            {progress?.user?.Username || "Usuario"}
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Premios</Text>
            <Text style={styles.cardSubtitle}>
              Comienza a aprender ahora y podrás ganar fabulosas recompensas
            </Text>
          </View>
          <View style={styles.containerPremiosBotton}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Rewards")}
              style={styles.button}
            >
              <Text style={styles.cardAction}>Ver todos</Text>
              <MaterialIcons name="chevron-right" color="#FFF" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitleRelato}>Relatos</Text>
          <Text style={styles.sectionSubtitleRelato}>
            3 relatos disponibles
          </Text>
          {/* {numberOfRelatos} */}
          <Carousel
            width={viewportWidth}
            height={viewportWidth}
            data={data}
            renderItem={renderItem}
            loop={true}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#862C29",
    paddingTop: 50,
    paddingHorizontal: 0,
  },
  containerPremiosBotton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  topMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pointsIcon: {
    marginRight: 5,
  },
  pointsText: {
    color: "#FFF",
    fontSize: 16,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  progressContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
  },
  carouselItem: {
    width: viewportWidth * 0.8,
    marginRight: 5,
    overflow: "hidden",
    borderRadius: 25,
  },
  card: {
    backgroundColor: "#862C29",
    padding: 20,
    borderRadius: 25,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardContent: {
    maxWidth: "70%",
  },
  cardTitle: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "white",
  },
  cardAction: {
    color: "white",
    fontSize: 16,
  },
  section: {
    backgroundColor: "#862C29",
    borderRadius: 25,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "flex-start",
    height: viewportWidth * 1.05,
    width: "120%",
    alignItems: "flex-start",
  },
  sectionTitle: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "400",
    marginBottom: 5,
    textAlign: "left",
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 30,
    textAlign: "left",
  },
  sectionTitleRelato: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "400",
    marginBottom: 10,
    textAlign: "left",
  },
  sectionSubtitleRelato: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 15,
    textAlign: "left",
  },
  relatoCard: {
    width: "110%",
    height: "92%",
    borderRadius: 25,
  },
  cardImage: {
    borderRadius: 25,
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.99)",
    borderRadius: 25,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  relatoTitle: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  relatoSubtitle: {
    fontSize: 14,
    color: "#FFF",
    textAlign: "center",
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: "#E97C71",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  startButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  containerBody: {
    flex: 1,
    backgroundColor: "#A43B36",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
