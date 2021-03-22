import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ScannerScreen from '../screens/Scanner';
const Stack = createStackNavigator();
export default function routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ScannerScreen" component={ScannerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
