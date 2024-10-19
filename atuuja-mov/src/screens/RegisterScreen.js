import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");

  const handleRegister = () => {
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/icons/isologo.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Crea una cuenta</Text>

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
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="calendar" size={24} color="#F28C85" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Edad"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="city" size={24} color="#F28C85" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Ciudad"
          value={city}
          onChangeText={setCity}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="file-document-outline" size={24} color="#F28C85" style={styles.icon} />
        <Picker
          selectedValue={documentType}
          style={styles.input}
          onValueChange={(itemValue) => setDocumentType(itemValue)}
        >
          <Picker.Item label="Selecciona el tipo de documento" value="" />
          <Picker.Item label="Cédula de ciudadanía" value="cedula" />
          <Picker.Item label="Pasaporte" value="pasaporte" />
          <Picker.Item label="Tarjeta de identidad" value="tarjeta_identidad" />
          <Picker.Item label="Cédula de extranjería" value="cedula_extranjeria" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="card-account-details-outline" size={24} color="#F28C85" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Número de documento"
          keyboardType="numeric"
          value={documentNumber}
          onChangeText={setDocumentNumber}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="email-outline" size={24} color="#F28C85" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="correo electrónico"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock-outline" size={24} color="#F28C85" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {error && <Text style={styles.errorMessage}>{errorMessage}</Text>}

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Crear cuenta</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0ED',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    color: '#443E3D',
    fontWeight: '600',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#F28C85',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#443E3D',
  },
  registerButton: {
    backgroundColor: '#8E3A34',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 30,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
  },
  loginText: {
    color: '#9A9A9A',
    fontSize: 14,
  },
  loginLink: {
    color: '#8E3A34',
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: '#D9534F',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default RegisterScreen;