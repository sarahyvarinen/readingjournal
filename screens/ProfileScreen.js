import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = () => {
    return (
        <View style={styles.container}>  
            <Text style={styles.title}>Your profile</Text>
            <Text style={styles.text}>This is your profile page, so on so forth. This must be updated</Text>
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
      fontSize: 24,
      fontWeight: 'bold',
    },
    text: {
      fontSize: 34,
      marginVertical: 10,
    },
});

export default ProfileScreen;
