import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';  

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLogin, setIsLogin] = useState(true); // This controls if the user wants to login or register

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login successfull"); // Debug
        } catch (err) {
            setError(err.message);
            console.log("Error at login:", err.message); // Debug
        }
    };

    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Registeration success"); // Debug
        } catch (err) {
            setError(err.message);
            console.log("Error at registeration:", err.message); // Debug
        }
    };

    return (
        <View style={styles.container}>
            <TextInput 
                placeholder="Email" 
                onChangeText={setEmail} 
                style={styles.input} 
                value={email} 
            />
            <TextInput 
                placeholder="Password" 
                onChangeText={setPassword} 
                secureTextEntry 
                style={styles.input} 
                value={password} 
            />
            {isLogin ? (
                <>
                    <Button title="Login" onPress={handleLogin} />
                    <Text style={styles.switchText} onPress={() => setIsLogin(false)}>
                        Don't have an account? Register here.
                    </Text>
                </>
            ) : (
                <>
                    <Button title="Register" onPress={handleRegister} />
                    <Text style={styles.switchText} onPress={() => setIsLogin(true)}>
                        Already have an account? Login here.
                    </Text>
                </>
            )}
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    input: { marginVertical: 10, padding: 10, borderWidth: 1, borderColor: '#ccc' },
    error: { color: 'red', marginTop: 10 },
    switchText: { color: 'blue', marginTop: 10, textDecorationLine: 'underline' },
});
