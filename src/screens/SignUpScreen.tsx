import React, {useState, useEffect} from 'react';
import {
  View, StyleSheet, Image, Alert, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity,
} from 'react-native';
import {TextInput, Button, Card} from 'react-native-paper';
import {getDBconnection, createTables, registerUser, userExists} from '../services/dbService';

const SignUpScreen = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const setupDB = async () => {
      const db = await getDBconnection();
      await createTables(db);
    };
    setupDB();
  }, []);

  const handleSignUp = async () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
        setLoading(true);
      const db = await getDBconnection();
      const exists = await userExists(db, username);
      if (exists) {
        Alert.alert('Error', 'Username already exists');
        return;
      }

      await registerUser(db, username, password);
      Alert.alert('Success', 'Account created! You can now log in.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to create account');
      console.error(error);
    }finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image
            source={require('../assets/login.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.centered}>
              <Text style={styles.title}>Sign Up</Text>
            </View>

            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              mode="outlined"
              style={styles.input}
              right={<TextInput.Icon icon="account" />}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry={!showPassword}
              style={styles.input}
              right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(!showPassword)} />}
            />

            <TextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="outlined"
              secureTextEntry={!showPassword}
              style={styles.input}
              right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(!showPassword)} />}
            />

            <Button
              mode="contained"
              onPress={handleSignUp}
              loading={loading}
              disabled={loading}
              style={styles.button}
              contentStyle={styles.buttonContent}>
              Sign Up
            </Button>

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.signupText}>Already have an account? Login</Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imageWrapper: {
    position: 'absolute',
    top: 10,
    zIndex: 0,
  },
  logo: {
    width: 300,
    height: 250,
  },
  card: {
    width: '100%',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    elevation: 6,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  centered: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    borderRadius: 25,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  signupText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#007BFF',
  },
});
