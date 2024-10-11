import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const EditFieldScreen = ({ route, navigation }) => {
  const { field } = route.params; // Obtener el campo que se está editando
  const [value, setValue] = useState('');

  const handleConfirm = () => {
    // Aquí se manejaría la lógica para actualizar el campo en la base de datos
    console.log(`Actualizando ${field} con el valor: ${value}`);
    navigation.goBack(); // Regresa a la pantalla anterior
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Editar {field}</Text>
      <TextInput
        style={styles.input}
        placeholder={`Nuevo ${field}`}
        value={value}
        onChangeText={setValue}
      />

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0ED',
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    color: '#443E3D',
    marginBottom: 10,
  },
  input: {
    borderColor: '#F28C85',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#8E3A34',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditFieldScreen;
