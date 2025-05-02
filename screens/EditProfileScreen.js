import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebaseConfig';
import { updateProfile } from 'firebase/auth';

export default function EditProfileScreen({ navigation }) {
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  const handleUpdate = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
      Alert.alert('Onnistui', 'Profiili päivitetty!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Virhe', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nimimerkki</Text>
      <TextInput
        style={styles.input}
        placeholder="Syötä nimimerkki"
        value={displayName}
        onChangeText={setDisplayName}
      />
      <Text style={styles.label}>Profiilikuvan URL</Text>
      <TextInput
        style={styles.input}
        placeholder="Syötä kuvan osoite"
        value={photoURL}
        onChangeText={setPhotoURL}
      />
      <Button title="Päivitä profiili" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontWeight: 'bold', marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
});
