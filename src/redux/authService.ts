import AsyncStorage from '@react-native-async-storage/async-storage';

const LOGIN_KEY = 'isLoggedIn';
const USER_KEY = 'loggedInUser';

export const setLoginStatus = async (status: boolean) => {
  await AsyncStorage.setItem(LOGIN_KEY, status ? 'true' : 'false');
};

export const isUserLoggedIn = async (): Promise<boolean> => {
  const value = await AsyncStorage.getItem(LOGIN_KEY);
  return value === 'true';
};

export const setLoggedInUser = async (user: { id: number; username: string; }) => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getLoggedInUser = async (): Promise<{ id: number; username: string;} | null> => {
  const user = await AsyncStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const logoutUser = async () => {
  await AsyncStorage.multiRemove([LOGIN_KEY, USER_KEY]);
};
