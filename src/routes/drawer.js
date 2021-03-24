import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer'
import HomeScreen from '../screens/HomeScreen';
import ScannerScreen from '../screens/Scanner';
import DrawerScreen from './routes'
const Drawer = createDrawerNavigator()
export default function routes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {/* <Drawer.Screen name="Drawer" component={DrawerScreen}/> */}
        <Drawer.Screen name="HomeScreen" component={() => <Text>lsj</Text>} />
        <Drawer.Screen name="ScannerScreen" component={() => <Text>lsjfdl</Text>} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
