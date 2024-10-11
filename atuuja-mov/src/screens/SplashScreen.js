import React, { useEffect } from 'react';
import { View, Image, StyleSheet} from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simular la carga de recursos o datos (2 segundos)
    const timer = setTimeout(() => {
      // Cuando termine la carga, navega a la pantalla de Login
      navigation.replace('Login');
    }, 2000);

    // Limpiar el temporizador al desmontar el componente
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Imagen centrada */}
      <Image source={require('../../assets/icons/isologo.png')} style={styles.logo} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0ED',  
    justifyContent: 'center',    
    alignItems: 'center',        
  },
  logo: {
    width: 200,      
    height: 200,
    resizeMode: 'contain',  
  },
  loader: {
    marginTop: 20,   
  },
});

export default SplashScreen;
