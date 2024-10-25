import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(null);
  const { login, error, loading } = useAuth();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      setLocalError("Por favor, introduce un correo electrónico válido.");
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        navigation.navigate("MainTabs", { screen: "Home" });
      } else {
        setLocalError("Correo o contraseña incorrectos. Inténtalo nuevamente.");
      }
    } catch (error) {
      setLocalError("Ocurrió un error durante el inicio de sesión. Inténtalo nuevamente.");
    }
  };

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/icons/isologo.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Inicia sesión con tu cuenta</Text>

      <View style={styles.inputContainer}>
        <Icon
          name="email-outline"
          size={24}
          color="#F28C85"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="correo electrónico"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setLocalError(null);
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon
          name="lock-outline"
          size={24}
          color="#F28C85"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="contraseña"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setLocalError(null);
          }}
        />
      </View>

      {localError && <Text style={styles.errorMessage}>{localError}</Text>}
      {error && <Text style={styles.errorMessage}>{error}</Text>}

      <TouchableOpacity
        style={styles.loginButton}
        disabled={!email || !password}
        onPress={handleLogin}
      >
        <View>
          <Text style={styles.loginButtonText}>Iniciar sesión</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>¿Aun no tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerLink}>Regístrate aquí</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0ED",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    color: "#443E3D",
    fontWeight: "600",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#F28C85",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#443E3D",
  },
  loginButton: {
    backgroundColor: "#8E3A34",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 30,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
  },
  registerText: {
    color: "#9A9A9A",
    fontSize: 14,
  },
  registerLink: {
    color: "#8E3A34",
    fontSize: 14,
    fontWeight: "bold",
  },
  errorMessage: {
    color: "#D9534F",
    fontSize: 14,
    marginBottom: 10,
  },
});

export default LoginScreen;
