import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import CircularProgress from "react-native-circular-progress-indicator";
import { useProgress } from "../context/ProgressContext";

const { width, height } = Dimensions.get("window");

const ProfileScreen = ({ navigation }) => {
  const { user } = useAuth();
  const percentage = 5;
  const puntosAcumulados = progress?.progress?.[0]?.PuntosAcumulados || 0;
  const { progress, fetchUserProgress, loading, error } = useProgress();
  const { user: authUser } = useAuth();

  useEffect(() => {
    if (authUser?.userId) {
      fetchUserProgress(authUser.userId);
    }
  }, [authUser]);
  return (
    <View style={styles.container}>
      {/* Top Menu */}
      <View style={styles.topMenu}>
        <View style={styles.pointsContainer}>
          <Image
            source={require("../../assets/icons/images/spiral-icon.png")}
            style={[styles.pointsIcon, { width: 28, height: 28 }]}
          />
          <Text style={styles.pointsText}>{puntosAcumulados}</Text>
        </View>
        <Image
          source={require("../../assets/icons/images/isologoBanner.png")}
          style={styles.logo}
        />
        <View style={styles.progressContainer}>
          <CircularProgress
            value={percentage}
            radius={16}
            progressValueColor={"#9A2C2B"}
            activeStrokeColor={"#E97C71"}
            strokeWidth={8}
            backgroundWidth={8}
            inActiveStrokeColor={"#FFF0ED"}
            circleBackgroundColor={"#FFF0ED"}
          />
        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.userName}>{user?.displayName || "Rina"}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile")}
          style={styles.editProfileButton}
        >
          <Text style={styles.editProfileText}>Editar perfil</Text>
        </TouchableOpacity>
      </View>

      {/* Nivel Card */}
      <View style={styles.levelCard}>
        <Text style={styles.levelText}>Continua aprendiendo..</Text>
        <Text style={styles.expText}></Text>
        <Text style={styles.levelDescription}>
          Pasa al siguiente los diferentes relatos para seguir aprendindo
          wayuunaiki
        </Text>
      </View>

      {/* Logros Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mis logros</Text>
        <View style={styles.achievementContainer}>
          <View style={styles.achievementBox}>
            <Text style={styles.achievementTitle}>Relato 1</Text>
            <Text style={styles.achievementDescription}>
              Aprendiz destacado
            </Text>
          </View>
        </View>
      </View>

      {/* Premios Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mis premios</Text>
        <View style={styles.rewardContainer}>
          <Image
            source={require("../../assets/icons/images/DALL·E-amaca_wayuu.jpg")}
            style={styles.rewardImage}
          />
          <Image
            source={require("../../assets/icons/images/DALL·E-sobrero_wayuu.png")}
            style={styles.rewardImage}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9A2C2B",
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
    marginRight: 5,
  },
  pointsText: {
    color: "#FFF",
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: height * 0.03,
  },
  userName: {
    fontSize: 28,
    color: "#FFF0ED",
    fontWeight: "bold",
  },
  editProfileButton: {
    backgroundColor: "#FBECE8",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  editProfileText: {
    color: "#9A2C2B",
    fontSize: 16,
    fontWeight: "bold",
  },
  levelCard: {
    backgroundColor: "#FFD1CA",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  levelText: {
    fontSize: 22,
    color: "#862C29",
    fontWeight: "bold",
  },
  expText: {
    fontSize: 18,
    color: "#333",
    marginVertical: 5,
  },
  expSubText: {
    fontSize: 16,
    color: "#333",
  },
  levelDescription: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginTop: 5,
  },
  section: {
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#FFF0ED",
    fontWeight: "bold",
    marginBottom: 10,
  },
  achievementContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  achievementBox: {
    backgroundColor: "#FFB3AA",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  achievementTitle: {
    fontSize: 16,
    color: "#862C29",
    fontWeight: "bold",
  },
  achievementDescription: {
    fontSize: 14,
    color: "#333",
  },
  rewardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  rewardImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: 10,
  },
});

export default ProfileScreen;
