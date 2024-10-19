import React from 'react';
import { View, Text, StyleSheet, ProgressBarAndroid, Image } from 'react-native';
import colors from '../constants/colors';
/* import * as Progress from 'react-native-progress';
 */
const HomeScreen = () => {
/*   const progressValue = 0.3;
 */
  return (
    <View style={styles.container}>
      <View style={styles.topMenu}>
        <View style={styles.pointsContainer}>
          <Image
            source={require('../../assets/icons/images/spiral-icon.png')}
            style={styles.pointsIcon}
          />
          <Text style={styles.pointsText}>120</Text>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/icons/images/isologoBanner.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.progressContainer}>
{/*           <Progress.Circle
            progress={progressValue}
            size={50}
            showsText={true}
            formatText={(percentage) => `${Math.round(percentage * 100)}%`}
            color={colors.luminous}
          /> */}
        </View>
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.subtitle}>Bienvenido de vuelta, Rina</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.principal,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  topMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  pointsText: {
    color: '#FFF',
    fontSize: 16,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  progressContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeContainer: {
    marginBottom: 20,
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
