import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../context/AuthContext";

const RegisterScreen = ({ navigation }) => {
  const [username, setName] = useState("");
  const [edad, setAge] = useState("");
  const [tipoDocumento, setDocumentType] = useState(-1);
  const [email, setEmail] = useState("");
  const [cuidad, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [numeroDocumento, setDocumentNumber] = useState("");
  const { register } = useAuth();
  const [localError, setLocalError] = useState(null);

  const generateId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  const handleRegister = async () => {
    try {
      const userId = generateId();
      const userData = {
        id: userId,
        username,
        email,
        password,
        isAdmin: false,
        edad: Number(edad),
        cuidad,
        tipoDocumento: Number(tipoDocumento),
        numeroDocumento,
      };

      if (
        !username ||
        !email ||
        !password ||
        !edad ||
        !cuidad ||
        tipoDocumento === null ||
        !numeroDocumento
      ) {
        setErrorMessage("Por favor, completa todos los campos requeridos.");
        setError(true);
        return;
      }

      const success = await register(userData);
      if (success) {
        setSuccessMessage("¡Registro exitoso!");
        setTimeout(() => {
          setSuccessMessage("");
          navigation.navigate("Login");
        }, 3000);

        setName("");
        setEmail("");
        setPassword("");
        setAge("");
        setCity("");
        setDocumentType(0);
        setDocumentNumber("");
      } else {
        setLocalError("Correo o contraseña incorrectos. Inténtalo nuevamente.");
        setTimeout(() => setLocalError(""), 3000);
      }
    } catch (error) {
      setLocalError(
        "Ocurrió un error durante el inicio de sesión. Inténtalo nuevamente."
      );
      setTimeout(() => setLocalError(""), 3000);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/icons/isologo.png")}
        style={styles.logo}
      />

      <View>
        <Text style={styles.title}>Crea una cuenta</Text>
      </View>

      <View style={styles.inputContainer}>
        <Icon
          name="account-outline"
          size={24}
          color="#F28C85"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="nombre"
          value={username}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="calendar" size={24} color="#F28C85" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Edad"
          keyboardType="numeric"
          value={edad}
          onChangeText={setAge}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="city" size={24} color="#F28C85" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Ciudad"
          value={cuidad}
          onChangeText={setCity}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon
          name="file-document-outline"
          size={24}
          color="#F28C85"
          style={styles.icon}
        />
        <Picker
          selectedValue={tipoDocumento}
          style={[styles.input, {height: 50, width: '100%'}]}
          onValueChange={(itemValue) => setDocumentType(itemValue)}
        >
          <Picker.Item label="Seleccione Tipo documento" value={-1} />
          <Picker.Item label="Cédula" value={0} />
          <Picker.Item label="Pasaporte" value={1} />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Icon
          name="card-account-details-outline"
          size={24}
          color="#F28C85"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Número de documento"
          keyboardType="numeric"
          value={numeroDocumento}
          onChangeText={setDocumentNumber}
        />
      </View>

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
          onChangeText={setEmail}
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
          onChangeText={setPassword}
        />
      </View>

      {error && errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}

      {successMessage ? (
        <Text style={styles.successMessage}>{successMessage}</Text>
      ) : null}

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <View>
          <Text style={styles.registerButtonText}>Crear cuenta</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <View>
            <Text style={styles.loginLink}>Iniciar sesión</Text>
          </View>
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
  registerButton: {
    backgroundColor: "#8E3A34",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 30,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
  },
  loginText: {
    color: "#9A9A9A",
    fontSize: 14,
  },
  loginLink: {
    color: "#8E3A34",
    fontSize: 14,
    fontWeight: "bold",
  },
  errorMessage: {
    color: "#D9534F",
    fontSize: 14,
    marginBottom: 10,
  },
  successMessage: {
    color: "#5CB85C",
    fontSize: 14,
    marginBottom: 10,
  },
});

export default RegisterScreen;
