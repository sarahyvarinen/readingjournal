import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function EditProfileScreen() {
  const [displayName, setDisplayName] = useState('');
  const [favoriteGenre, setFavoriteGenre] = useState('');
  const [readBooks, setReadBooks] = useState(0);
  const [inProgressBooks, setInProgressBooks] = useState(0);
  const [photoURL, setPhotoURL] = useState('');

  const navigation = useNavigation();
  const user = getAuth().currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        const userData = docSnap.exists() ? docSnap.data() : {};

        setDisplayName(user.displayName || '');
        setFavoriteGenre(userData.favoriteGenre || '');
        setReadBooks(userData.readBooks || 0);
        setInProgressBooks(userData.inProgressBooks || 0);
        setPhotoURL(user.photoURL || '');
      }
    };

    fetchUserData();
  }, [user]);

  const handleUpdate = async () => {
    if (!user) return;

    try {
      // Updates data from Firebase
      await updateProfile(user, {
        displayName,
        photoURL,
      });

      // Updates data from Firestore
      const userRef = doc(db, 'users', user.uid);
      const userData = {
        favoriteGenre,
        readBooks,
        inProgressBooks,
      };

      await setDoc(userRef, userData, { merge: true });

      Alert.alert('Success', 'profile updated!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={displayName}
        onChangeText={setDisplayName}
        style={styles.input}
      />
      <TextInput
        placeholder="Favourite genre"
        value={favoriteGenre}
        onChangeText={setFavoriteGenre}
        style={styles.input}
      />
      <View style={styles.row}>
        <Text>Luetut kirjat: {readBooks}</Text>
        <Button title="+" onPress={() => setReadBooks(readBooks + 1)} />
        <Button title="-" onPress={() => setReadBooks(Math.max(0, readBooks - 1))} />
      </View>
      <View style={styles.row}>
        <Text>Keskeneräiset kirjat: {inProgressBooks}</Text>
        <Button title="+" onPress={() => setInProgressBooks(inProgressBooks + 1)} />
        <Button title="-" onPress={() => setInProgressBooks(Math.max(0, inProgressBooks - 1))} />
      </View>
      <TextInput
        placeholder="Profilepicture URL"
        value={photoURL}
        onChangeText={setPhotoURL}
        style={styles.input}
      />
      <Button title="Save changes" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: 'green'  // Green background
  },
  input: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    gap: 10,
  },
});
