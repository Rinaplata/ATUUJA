import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Alert, Pressable, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading } = useAuth();

  const handleLogin = async () => {
    // await fetch('http://jsonplaceholder.typicode.com/posts/1')
    await login(email, password);
  };


  if (loading) return <View><Text>Loading...</Text></View>
  if (error) return <View><Text>Error: {error}</Text></View>

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

      {error && <Text style={styles.errorMessage}>{error}</Text>}

      <Pressable style={styles.loginButton} disabled={!email || !password} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
        {error && <Text style={{ color: 'red' }}>{error}</Text>} {/* Mostrar error si existe */}
      </Pressable>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>¿Aun no tienes una cuenta? </Text>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerLink}>Regístrate aquí</Text>
        </Pressable>
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
  forgotPassword: {
    color: '#9A9A9A',
    fontSize: 14,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#8E3A34',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 30,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
  },
  registerText: {
    color: '#9A9A9A',
    fontSize: 14,
  },
  registerLink: {
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

export default LoginScreen;
