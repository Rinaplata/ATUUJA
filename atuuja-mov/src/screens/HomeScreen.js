import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../constants/colors";
import CircularProgress from "react-native-circular-progress-indicator";

const HomeScreen = () => {
  const percentage = 5;

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
            radius={20}
            titleFontSize={16} 
            progressValueColor={"#9A2C2B"} 
            progressValueStyle={{ fontSize: 18, color: "#9A2C2B" }}
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
      <View style={styles.welcomeContainer}>
        <Text style={styles.subtitle}>Bienvenido de vuelta, Rina</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.principal,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  topMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pointsIcon: {
    width: 24,
    height: 24,
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
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeContainer: {
    marginBottom: 20,
  },
  title: {
    color: colors.luminous,
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    color: "#FFF",
  },
});

export default HomeScreen;
