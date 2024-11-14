import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const QuizResultScreen = ({ navigation, route }) => {
  const { correctAnswers = 0, incorrectAnswers = 0, totalPoints = 0, RelatoId } = route.params || {};

  const handleRetry = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Learn", params: { RelatoId } }],
    });
  };

  const handleClaimReward = () => {
    navigation.navigate("Rewards", { RelatoId, totalPoints });
  };

  const allQuestionsAnswered = correctAnswers + incorrectAnswers > 0;

  return (
    <View style={styles.container}>
      {/* Mensaje principal */}
      <Text style={styles.mainMessage}>{correctAnswers > 0 ? "¡Bien Hecho!" : "¡Vaya!"}</Text>
      <Text style={styles.subMessage}>
        {correctAnswers > 0
          ? "Completaste el Relato exitosamente."
          : "Parece que necesitas intentarlo de nuevo."}
      </Text>

      {/* Contenedor de puntuación */}
      <View style={styles.scoreContainer}>
        <Text style={styles.sectionTitle}>Tu puntuación</Text>
        <View style={styles.scoreBoxContainer}>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>Correctas</Text>
            <Text style={styles.scoreValue}>{correctAnswers}</Text>
          </View>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>Incorrectas</Text>
            <Text style={styles.scoreValue}>{incorrectAnswers}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recompensas</Text>
        <View style={styles.rewardBox}>
          <Text style={styles.rewardLabel}>Puntos totales</Text>
          <Text style={styles.rewardValue}>{totalPoints}</Text>
        </View>
      </View>

      {/* Botón de acción */}
      {allQuestionsAnswered ? (
        <TouchableOpacity style={styles.claimButton} onPress={handleClaimReward}>
          <Text style={styles.claimButtonText}>Recubir Recompensas</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>Intentar Nuevamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBECE8",
    paddingHorizontal: 20,
    paddingVertical: height * 0.07,
    justifyContent: "space-between",
  },
  mainMessage: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333",
    marginBottom: 10,
  },
  subMessage: {
    fontSize: 18,
    textAlign: "center",
    color: "#333333",
    marginBottom: 30,
  },
  scoreContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 15,
  },
  scoreBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
  },
  scoreBox: {
    backgroundColor: "#FFB3AA",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    width: width * 0.4,
  },
  scoreLabel: {
    fontSize: 16,
    color: "#333333",
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  rewardBox: {
    backgroundColor: "#FFD1CA",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  rewardLabel: {
    fontSize: 16,
    color: "#333333",
  },
  rewardValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  retryButton: {
    backgroundColor: "#BF2D2C",
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default QuizResultScreen;
