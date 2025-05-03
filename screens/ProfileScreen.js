import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import * as Battery from 'expo-battery';

export default function ProfileScreen({ navigation }) {
  const user = auth.currentUser;
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [currentTime, setCurrentTime] = useState('');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Tells the battery level
  useEffect(() => {
    const fetchBattery = async () => {
      const level = await Battery.getBatteryLevelAsync();
      setBatteryLevel(Math.round(level * 100));
    };
    fetchBattery();
  }, []);

  // Updates time from phone
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // updates once a minute
    return () => clearInterval(interval);
  }, []);

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
        <Text style={styles.label}>Name: {user?.displayName || 'Not set'}</Text>
        <Text style={styles.label}>Read books: 12</Text>
        <Text style={styles.label}>Currently reading: </Text>
        <Text style={styles.label}>Favourite genre: </Text>

        <Text style={styles.extra}>🦊 Fox is currently reading at {currentTime}</Text>
        {batteryLevel !== null && (
          <Text style={styles.extra}>🔋 Your fox is {batteryLevel} % happy</Text>
        )}

        <View style={styles.buttonContainer}>
          <Button title="Kirjaudu ulos" onPress={handleLogout} color="#c62828" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#e6ecf0',
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
  extra: {
    marginTop: 8,
    fontSize: 16,
    fontStyle: 'italic',
  },
  buttonContainer: {
    marginTop: 20,
  },
});
