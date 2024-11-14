import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { useRewards } from "../context/RewardContext";
import colors from "../constants/colors";

const { height, width: viewportWidth } = Dimensions.get("window");

const RewardsScreen =({ navigation, route }) => {
  const {RelatoId} = route.params || {};
  const { rewards, loadingRewards, errorRewards } = useRewards();

  const userPoints = 120; 

  if (loadingRewards) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando premios...</Text>
      </View>
    );
  }

  if (errorRewards) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Error al cargar los premios: {errorRewards}
        </Text>
      </View>
    );
  }

  const progressPercentage = Math.min((userPoints / 100) * 100, 100); // Example progress calculation

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {/* Top Bar */}
      <View style={styles.topMenu}>
        <View style={styles.pointsContainer}>
          <Image
            source={require("../../assets/icons/images/spiral-icon.png")}
            style={[styles.pointsIcon, { width: 28, height: 28 }]}
          />
          <Text style={styles.pointsText}>{userPoints}</Text>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/icons/images/isologoBanner.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.progressContainer}>
          <CircularProgress
            value={progressPercentage}
            radius={16}
            progressValueColor={"#9A2C2B"}
            activeStrokeColor={"#E97C71"}
            strokeWidth={8}
            inActiveStrokeColor={"#FFF0ED"}
            circleBackgroundColor={"#FFF0ED"}
          />
        </View>
      </View>

      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Premios</Text>
        <Text style={styles.headerSubtitle}>
          Continúa aprendiendo y podrás ganar fabulosas recompensas
        </Text>
      </View>

      {/* Levels Section */}
      <Text style={styles.sectionTitle}>Desbloquea en cada nivel</Text>
      <FlatList
        horizontal
        data={[
          { id: 1, title: "Relatos Nivel 1", subtitle: "Aprendiz destacado" },
          { id: 2, title: "Relatos Nivel 2", subtitle: "Aprendiz Relámpago" },
          { id: 3, title: "Relatos Nivel 3", subtitle: "Aprendiz Audaz" },
        ]}
        renderItem={({ item }) => <LevelCard level={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContainer}
      />

      {/* Rewards Section */}
      <Text style={styles.sectionTitle}>Premios</Text>
      <FlatList
        horizontal
        data={rewards}
        renderItem={({ item }) => (
          <RewardCard reward={item} userPoints={userPoints} />
        )}
        keyExtractor={(item) => item.PremioId}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContainer}
      />
    </ScrollView>
  );
};

const LevelCard = ({ level }) => (
  <View style={styles.levelCard}>
    <Image
      style={styles.levelImage}
    />
    <Text style={styles.levelTitle}>{level.title}</Text>
    <Text style={styles.levelSubtitle}>{level.subtitle}</Text>
  </View>
);

const RewardCard = ({ reward, userPoints }) => {
  const canClaim = userPoints >= reward.Puntos;

  return (
    <View style={styles.rewardCard}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: reward.ImagenUrl }}
          style={styles.rewardImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.rewardTitle}>{reward.Nombre}</Text>
      <Text style={styles.rewardPoints}>
        {reward.Puntos}{" "}
        <Image
          source={require("../../assets/icons/images/spiral-icon.png")}
          style={{ width: 14, height: 14 }}
        />
      </Text>
      <TouchableOpacity
        style={[styles.rewardButton, !canClaim && styles.disabledButton]}
        disabled={!canClaim}
      >
        <Text style={styles.rewardButtonText}>
          {canClaim ? "Reclamar" : "Bloqueado"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#862C29",
    paddingHorizontal: 20,
    paddingVertical: height * 0.06,
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
    marginRight: 7,
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
  headerContainer: {
    backgroundColor: colors.variante7,
    padding: 30,
    borderRadius: 10,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
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
  },
  carouselContainer: {
    paddingVertical: 20,
  },
  levelCard: {
    backgroundColor: colors.variante6,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 20,
    width: viewportWidth * 0.35,
  },
  levelImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  levelTitle: {
    fontSize: 14,
    color: colors.principal,
    fontWeight: "bold",
  },
  levelSubtitle: {
    fontSize: 12,
    color: "#FFF",
  },
  rewardCard: {
    backgroundColor: colors.variante2,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginRight: 20,
    width: viewportWidth * 0.45,
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  rewardImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  rewardTitle: {
    fontSize: 16,
    color: colors.principal,
    marginBottom: 5,
    textAlign: "center",
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
});

export default RewardsScreen;
