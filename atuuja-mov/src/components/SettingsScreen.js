import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Sobre tu cuenta</Text>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('EditField', { field: 'name' })}>
        <Text>Nombre</Text>
        <Text>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('EditField', { field: 'email' })}>
        <Text>Correo Electrónico</Text>
        <Text>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('EditField', { field: 'password' })}>
        <Text>Cambiar contraseña</Text>
        <Text>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={() => { /* Función para cerrar sesión */ }}>
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0ED',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#443E3D',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F28C85',
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#8E3A34',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
