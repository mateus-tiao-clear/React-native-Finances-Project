import { StyleSheet, Text, View, StatusBar } from 'react-native';
import "react-native-gesture-handler"

import Routes from './src/config/routes';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/contexts/auth';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor={"#131313"} barStyle="light-content"/>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}