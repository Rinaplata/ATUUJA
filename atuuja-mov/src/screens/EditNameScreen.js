import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../constants/colors';

const EditNameScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [newName, setNewName] = useState(user?.displayName || '');

  const handleSave = () => {
    updateProfile(user, { displayName: newName })
      .then(() => {
        alert('Nombre actualizado con éxito');
        navigation.goBack();
      })
      .catch(error => alert(error.message));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar nombre</Text>
      </View>

      
      <View style={styles.inputContainer}>
        <MaterialIcons name="person" size={24} color="#A9A9A9" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={newName}
          onChangeText={setNewName}
          placeholder="Nuevo nombre"
          placeholderTextColor="#A9A9A9"
        />
      </View>

      
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.principal,
    padding: 20,
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#B35A56', // Color del botón en el diseño
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    position: 'absolute', // Botón flotante
    bottom: 20, // Posicionado cerca del borde inferior
    left: 20,
    right: 20,
  },
  saveText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditNameScreen;
