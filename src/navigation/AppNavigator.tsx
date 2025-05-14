import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import FeedScreen from '../screens/FeedScreen';
import CreatepostScreen from '../screens/CreatepostScreen';
import EditPostScreen from '../screens/EditPostScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { isUserLoggedIn } from '../redux/authService';
const Stack = createStackNavigator();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
 useEffect(() => {
    const checkLogin = async () => {
      const loggedIn = await isUserLoggedIn();
      setInitialRoute(loggedIn ? 'Feed' : 'Login');
    };
    checkLogin();
  }, []);
   if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="CreatePost" component={CreatepostScreen} />
        <Stack.Screen name="EditPost" component={EditPostScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
