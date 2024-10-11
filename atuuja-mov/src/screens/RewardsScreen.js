import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors'; 

const RewardsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Rewards</Text>
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
});

export default RewardsScreen;
