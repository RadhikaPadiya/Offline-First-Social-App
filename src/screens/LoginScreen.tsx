import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Alert,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {TextInput, Button, Card, ActivityIndicator} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {setLoginStatus, setLoggedInUser} from '../redux/authService';
import {getDBconnection, validateUser} from '../services/dbService';
const dummyUser = {
  username: 'demo',
  password: '1234',
};

const LoginScreen = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    try {
      const db = await getDBconnection();
      const user = await validateUser(db, username, password);
      if (user) {
        await setLoginStatus(true);
        await setLoggedInUser({id: user.id, username: user.username});
        navigation.replace('Feed');
      } else {
        Alert.alert('Login Failed', 'Incorrect username or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Overlapping image */}
        <View style={styles.imageWrapper}>
          <Image
            source={require('../assets/login.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Login Card */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.centered}>
              <Text style={styles.title}>Login</Text>
            </View>

            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              mode="outlined"
              style={styles.input}
              right={
                <TextInput.Icon
                  icon={'account'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry={!showPassword}
              style={styles.input}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={styles.button}
              contentStyle={styles.buttonContent}>
              Login
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signupText}>
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
         {loading && (
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color="#6A1B9A" />
      </View>
    )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

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
  loadingOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
},

});
