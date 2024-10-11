import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { auth } from '../services/firebaseConfig'; 

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = () => {
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Actualiza el perfil del usuario con el nombre
        updateProfile(user, {
          displayName: name, // Asocia el nombre con el perfil
        }).then(() => {
          console.log('Usuario registrado con nombre:', user.displayName);
          navigation.navigate('Login',{screen:'LoginScreen'}); // Navegar a la pantalla de Login si el registro es exitoso
        }).catch((error) => {
          setError(true);
          setErrorMessage(error.message);
        });

      })
      .catch((error) => {
        // Si el registro falla, muestra el error
        setError(true);
        setErrorMessage(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icons/isologo.png')}  
        style={styles.logo}
      />

      <Text style={styles.title}>Crea una cuenta</Text>

      <View style={styles.inputContainer}>
        <Icon name="account-outline" size={24} color="#F28C85" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="nombre"
          value={name}
          onChangeText={setName}
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

      {error && (
        <Text style={styles.errorMessage}>
          {errorMessage}
        </Text>
      )}

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Crear cuenta</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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
