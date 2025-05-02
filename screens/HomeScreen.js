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
