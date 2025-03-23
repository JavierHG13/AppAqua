import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Link } from 'expo-router';

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>

      <Text>Pagina de inicio</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#ffff',
    padding: 20,
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00796b',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#004d40',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  menu: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#40a9ff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    width: '100%',
    textAlign: 'center',
  },
});

export default HomeScreen
