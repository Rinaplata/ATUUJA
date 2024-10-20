import React from "react";
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
import { MaterialIcons } from '@expo/vector-icons';

const { width: viewportWidth } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const percentage = 5; // Ejemplo de porcentaje para el progreso

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
    <ImageBackground
      source={item.image}
      style={styles.relatoCard}
      imageStyle={styles.cardImage}
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
  );

  return (
    <View style={styles.container}>
      <View style={styles.topMenu}>
        <View style={styles.pointsContainer}>
          <Image
            source={require("../../assets/icons/images/spiral-icon.png")}
            style={[styles.pointsIcon, { width: 28, height: 28 }]}
          />
          <Text style={styles.pointsText}>120</Text>
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
          <Text style={styles.welcomeText}> Rina</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Premios</Text>
            <Text style={styles.cardSubtitle}>
              Comienza a aprender ahora y podrás ganar fabulosas recompensas
            </Text>
          </View>
          <View style={styles.containerPremiosBotton}>
          <TouchableOpacity onPress={() => navigation.navigate("Rewards")} style={styles.button}>
            <Text style={styles.cardAction}>Ver todos</Text>
            <MaterialIcons name="chevron-right" color="#FFF" size={20}/>
          </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Relatos</Text>
          <View style={styles.carouselContainer}>
            <Carousel
              width={viewportWidth}
              height={viewportWidth * 0.75}
              data={data}
              renderItem={renderItem}
              loop={true}
            />
          </View>
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
  containerPremiosBotton:{
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
  carouselContainer: {
    backgroundColor: "#6E1E1E", // Tono rojo oscuro
    paddingVertical: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  card: {
    backgroundColor: "#862C29",
    padding: 20,
    borderRadius: 10,
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
    marginTop: 20,
    backgroundColor: "#6E1E1E",
  },
  sectionTitle: {
    fontSize: 18,
    color: "#FFF",
    marginBottom: 10,
  },
  relatoCard: {
    width: viewportWidth * 0.8,
    height: viewportWidth * 0.6,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  cardImage: {
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 15,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Efecto de oscurecimiento.
  },
  relatoTitle: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 5,
  },
  relatoSubtitle: {
    fontSize: 16,
    color: "#FFF",
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
