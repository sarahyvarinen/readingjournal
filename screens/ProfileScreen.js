import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import * as Battery from 'expo-battery';

export default function ProfileScreen({ navigation }) {
  const user = auth.currentUser;
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [profileData, setProfileData] = useState({
    favoriteGenre: '',
    readBooks: 0,
    inProgressBooks: 0,
  });

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

  // Fetch user profile data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfileData({
          favoriteGenre: data.favoriteGenre || '',
          readBooks: data.readBooks || 0,
          inProgressBooks: data.inProgressBooks || 0,
        });
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <Image
          source={{
            uri: user?.photoURL || 'https://i.pravatar.cc/150?img=12',
          }}
          style={styles.avatar}
        />
        <Text style={styles.label}>Email: {user?.email}</Text>
        <Text style={styles.label}>Name: {user?.displayName || 'Not set'}</Text>
        <Text style={styles.label}>Read books: {profileData.readBooks}</Text>
        <Text style={styles.label}>Currently reading: {profileData.inProgressBooks}</Text>
        <Text style={styles.label}>Favourite genre: {profileData.favoriteGenre}</Text>

        <Text style={styles.extra}>🦊 Fox is currently reading at {currentTime}</Text>
        {batteryLevel !== null && (
          <Text style={styles.extra}>🔋 Your fox is {batteryLevel}% happy</Text>
        )}

        <View style={styles.buttonContainer}>
          <Button title="Log out" onPress={handleLogout} color="#c62828" />
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
