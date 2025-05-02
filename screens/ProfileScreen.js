import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function ProfileScreen({ navigation }) {
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      console.error('Uloskirjautuminen epäonnistui:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profiili</Text>

      <View style={styles.card}>
        <Image
          source={{
            uri: user?.photoURL || 'https://i.pravatar.cc/150?img=12',
          }}
          style={styles.avatar}
        />
        <Text style={styles.label}>Email: {user?.email}</Text>
        <Text style={styles.label}>Name: {user?.displayName || 'Ei asetettu'}</Text>
        <Text style={styles.label}>Read books: 12</Text>
        <Text style={styles.label}>Books I am reading right now: </Text>
        <Text style={styles.label}>Favourite genre: </Text>
        <View style={styles.buttonContainer}>
          <Button title="Kirjaudu ulos" onPress={handleLogout} color="#c62828" />
        </View>
      </View>

      {/* Ketun kuva alareunassa */}
      <Image
        source={require('../assets/foxt.jpg')} // Oletetaan, että kuva on assets-kansiossa
        style={styles.foxImage}
      />
    </View>
  );
}

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
