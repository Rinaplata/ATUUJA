import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import CircularProgress from "react-native-circular-progress-indicator";
import { MaterialIcons } from "@expo/vector-icons";
import colors from '../constants/colors';

const { width: viewportWidth } = Dimensions.get('window'); // Para calcular tamaños dinámicos

const RewardsScreen = () => {
  const percentage = 5; 

  

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      {/* Encabezado */}
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
         <Text style={styles.welcomeText}> Rina</Text>
         <View style={styles.header}>
          <Text style={styles.headerTitle}>Premios</Text>
          <Text style={styles.headerSubtitle}>
            Continúa aprendiendo y podrás ganar fabulosas recompensas
          </Text>
      </View>
        </View>
      </View>
      

      {/* Carrusel de Niveles */}
      <Text style={styles.sectionTitle}>Desbloquea en cada nivel</Text>
      <FlatList
        horizontal
        data={levels}
        renderItem={({ item }) => <LevelCard level={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContainer}
      />

      {/* Carrusel de Premios */}
      <Text style={styles.sectionTitle}>Premios</Text>
      <FlatList
        horizontal
        data={rewards}
        renderItem={({ item }) => <RewardCard reward={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContainer}
      />
    </ScrollView>
  );
};

// Componente para tarjetas de niveles
const LevelCard = ({ level }) => (
  <View style={styles.levelCard}>
    <Image source={level.icon} style={styles.roundImage} />
    <Text style={styles.levelTitle}>{level.title}</Text>
    <Text style={styles.levelSubtitle}>{level.subtitle}</Text>
  </View>
);

// Componente para tarjetas de premios
const RewardCard = ({ reward }) => (
  <View style={styles.rewardCard}>
    <View style={styles.imageWrapper}>
      <Image source={reward.image} style={styles.rewardImage} resizeMode="contain" />
    </View>
    <Text style={styles.rewardTitle}>{reward.title}</Text>
    <Text style={styles.rewardPoints}>{reward.points}</Text>
    <TouchableOpacity
      style={[styles.rewardButton, reward.claimed ? styles.disabledButton : null]}
      disabled={reward.claimed}
    >
      <Text style={styles.rewardButtonText}>
        {reward.claimed ? 'Reclamado' : 'Reclamar'}
      </Text>
    </TouchableOpacity>
  </View>
);

// Datos de niveles
const levels = [
  { icon: require('../../assets/icons/images/DALL·E-amaca_wayuu.jpg'), title: 'Nivel 1', subtitle: 'Aprendiz destacado' },
  { icon: require('../../assets/icons/images/DALL·E-amaca_wayuu.jpg'), title: 'Nivel 2', subtitle: 'Aprendiz Relámpago' },
  { icon: require('../../assets/icons/images/DALL·E-amaca_wayuu.jpg'), title: 'Nivel 3', subtitle: 'Aprendiz Audaz' },
];

// Datos de premios
const rewards = [
  { image: require('../../assets/images/DALL·E-amaca_wayuu.jpg'), title: 'Mochila Wayuu', points: '150', claimed: true },
  { image: require('../../assets/images/DALL·E-sobrero_wayuu.png'), title: 'Sombrero Wayuu', points: '400', claimed: false },
  { image: require('../../assets/images/DALL·E-sobrero_wayuu.png'), title: 'Sombrero Ejemplo', points: '200', claimed: false },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#862C29",
    paddingTop: 50,
    paddingHorizontal: 0,
  },
  containerBody: {
    flex: 1,
    backgroundColor: "#A43B36",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: colors.variante7,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.luminous,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.luminous,
  },
  sectionTitle: {
    fontSize: 18,
    color: colors.luminous,
    marginBottom: 20,
    marginTop:30,
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
    paddingVertical: 20,
  },
  levelCard: {
    backgroundColor: colors.variante6,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 15,
    width: 120,
  },
  rewardCard: {
    backgroundColor: colors.variante2,
    paddingTop: 60, 
    borderRadius: 15,
    alignItems: 'center',
    marginRight: 20,
    width: viewportWidth * 0.45,
    paddingBottom: 15,
  },
  imageWrapper: {
    position: 'absolute',
    top: -40, // Ajuste para que la imagen no se corte
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.luminous,
  },
  rewardImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  rewardTitle: {
    fontSize: 16,
    color: colors.principal,
    marginBottom: 5,
    textAlign: 'center',
    marginTop: 10,
  },
  rewardPoints: {
    fontSize: 16,
    color: colors.principal,
    marginBottom: 10,
  },
  rewardButton: {
    backgroundColor: colors.principal,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  rewardButtonText: {
    color: colors.luminous,
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: colors.variante3,
  },
  roundImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
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
});

export default RewardsScreen;
