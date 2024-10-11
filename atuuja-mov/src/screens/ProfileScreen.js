import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext'; 

const ProfileScreen = ({ navigation }) => {
  const { user } = useAuth(); 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.title}>{user?.displayName|| 'Usuario'}</Text>      
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.editButton}>Editar perfil</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Estas en nivel 1</Text>
        <Text style={styles.expText}>Tus EXP: 125</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mis logros</Text>
        {/* Coloca aquí tus componentes visuales para los logros */}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mis premios</Text>
        {/* Coloca aquí tus componentes visuales para los premios */}
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9A2C2B', // Usando el color principal del tema
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    color: '#FFF0ED', // Color de texto variante
  },
  editButton: {
    color: '#FFF',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#FFD1CA',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFF',
  },
  expText: {
    fontSize: 16,
    color: '#FFF',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#E74C3C', // Color para el botón de cerrar sesión
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default ProfileScreen;
