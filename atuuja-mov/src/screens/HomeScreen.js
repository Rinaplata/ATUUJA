import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import { useAuth } from '../context/AuthContext'; 


const HomeScreen = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Bienvenido de vuelta,</Text>
      <Text style={styles.title}>{user?.displayName|| 'Usuario'}</Text> 
    </View>   
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.principal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.luminous,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFF',
  },
});

export default HomeScreen;
