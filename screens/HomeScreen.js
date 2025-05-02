import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Reading Journal</Text>
      
      {/* Button for Search books */}
      <Button
        title="Search books"
        onPress={() => navigation.navigate('BookDetails')} // Navigate to the BookDetailsScreen
      />

      {/* Button for Profile */}
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')} // Navigate to the ProfileScreen
      />

      {/* Button for Editing */}
      <Button 
      title="Edit profile"
      onPress={() => navigation.navigate('Edit')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#e6ecf0',
    position: 'relative', // Tämä on tärkeää, jotta kuvan voi sijoittaa absoluuttisesti
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'olive',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginVertical: 4,
  },
  buttonContainer: {
    marginTop: 20,
  },
  foxImage: {
    width: 80,
    height: 80,
    position: 'absolute',
    bottom: 10, // Sijoittaa kuvan alareunaan
    left: '15%', // Keskittää kuvan horisontaalisesti
    marginLeft: -40, // Puoleksi kuvan leveydestä, jotta se on tarkasti keskellä
  },
});


export default HomeScreen;
