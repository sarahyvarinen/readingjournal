import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native'; // ✅ lisää Image ja StyleSheet
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { auth, firestore } from './firebaseConfig';

import HomeScreen from './screens/HomeScreen';
import BookDetailsScreen from './screens/BookDetailsScreen';
import BookInfoScreen from './screens/BookInfoScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import EditProfileScreen from './screens/EditProfileScreen';

const Stack = createStackNavigator();

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [firestoreStatus, setFirestoreStatus] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setCheckingAuth(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      const testFirestore = async () => {
        try {
          const querySnapshot = await getDocs(collection(firestore, 'users'));
          querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
          });
          setFirestoreStatus('onnistui');
        } catch (e) {
          console.error('Firestore-yhteys ei toimi:', e.message);
          setFirestoreStatus('virhe');
        }
      };

      testFirestore();
    }
  }, [user]);

  if (checkingAuth) return null;

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        {firestoreStatus === 'virhe' && (
          <View style={{ padding: 10, backgroundColor: 'red' }}>
            <Text style={{ color: 'white' }}>Virhe Firestoressa</Text>
          </View>
        )}
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
              <Stack.Screen name="BookInfo" component={BookInfoScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Edit" component={EditProfileScreen} />
            </>
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>

      {/* ✅ Kettukuva alareunaan */}
      <Image
        source={require('./assets/foxt.jpg')}
        style={styles.fox}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fox: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default App;
