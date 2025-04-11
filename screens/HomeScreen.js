import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Reading Journal</Text>
      
      {/* Button for Search books */}
      <Button
        title="Search books"
        onPress={() => navigation.navigate('BookDetails')} 
      />

      {/* Button for Profile */}
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
});

export default HomeScreen;
