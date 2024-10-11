import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ForgotPasswordScreen = () => {
  const [step, setStep] = useState(1);  
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Función para avanzar al siguiente paso
  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  // Función para retroceder al paso anterior
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icons/isologo.png')}  
        style={styles.logo}
      />

      {/* Condicional para mostrar la vista según el paso */}
      {step === 1 && (
        <View>
          <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
          <Text style={styles.description}>No te preocupes, te enviaremos las instrucciones de recuperación</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="correo electrónico"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleNextStep}>
            <Text style={styles.buttonText}>Recuperar</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 2 && (
        <View>
          <Text style={styles.title}>Ingresa el código de verificación</Text>
          <View style={styles.codeContainer}>
            {/* Campos de verificación */}
            {Array(4).fill('').map((_, index) => (
              <TextInput
                key={index}
                style={styles.codeInput}
                maxLength={1}
                keyboardType="numeric"
                value={code[index]}
                onChangeText={(value) => {
                  const newCode = code.split('');
                  newCode[index] = value;
                  setCode(newCode.join(''));
                }}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleNextStep}>
            <Text style={styles.buttonText}>Verificar</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 3 && (
        <View>
          <Text style={styles.title}>Establece una nueva contraseña</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="nueva contraseña"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="confirmar contraseña"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={() => console.log('Contraseña restablecida')}>
            <Text style={styles.buttonText}>Restablecer</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Enlace para regresar al login */}
      {step === 1 && (
        <TouchableOpacity onPress={handlePreviousStep}>
          <Text style={styles.backLink}>Volver a la página de Inicio de sesión</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 24,
  },
  button: {
    backgroundColor: '#AB2E1C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  backLink: {
    color: '#AB2E1C',
    marginTop: 20,
  },
});

export default ForgotPasswordScreen;
