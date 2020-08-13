import 'react-native-gesture-handler';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  DrawerActions,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  AppearanceProvider,
  useColorScheme,
} from 'react-native-appearance';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import logo from './assets/logo.png';
import Feed from './src/Feed';
import Screen1 from './src/screens/drawer/Screen1';
import Screen2 from './src/screens/drawer/Screen2';
import Screen3 from './src/screens/drawer/Screen3';
import Tab1 from './src/screens/tabs/Tab1';
import Tab2 from './src/screens/tabs/Tab2';
import Tab3 from './src/screens/tabs/Tab3';
import Detail from './src/Detail';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();

export default function App() {
  const colorScheme = useColorScheme();

  const MyTheme = {
    dark: false,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: 'rgb(242, 242, 242)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  };

  const createHomeStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name='Feed'
        component={Feed}
        options={({ navigation }) => ({
          title: 'React Navigation',
          headerLeft: () => (
            <Icon
              onPress={() =>
                navigation.dispatch(DrawerActions.toggleDrawer())
              }
              style={[{ color: 'black', marginLeft: 8 }]}
              size={24}
              name={'menu'}
            />
          ),
        })}
      />
      <Stack.Screen
        name='Detail'
        component={Detail}
        options={{
          title: 'Detail Screen',
          headerStyle: { backgroundColor: 'darkblue' },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen name='Bottom Tabs' children={createBottomTabs} />
      <Stack.Screen name='Top Tabs' children={createTopTabs} />
    </Stack.Navigator>
  );

  const createBottomTabs = () => (
    <MaterialBottomTabs.Navigator>
      <MaterialBottomTabs.Screen
        name='Tab 1'
        component={Tab1}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Icon
              style={[{ color: 'white' }]}
              size={25}
              name={'home'}
            />
          ),
        }}
      />
      <MaterialBottomTabs.Screen
        name='Tab 2'
        component={Tab2}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <Icon
              style={[{ color: 'white' }]}
              size={25}
              name={'human'}
            />
          ),
        }}
      />
      <MaterialBottomTabs.Screen
        name='Tab 3'
        component={Tab3}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: () => (
            <Icon
              style={[{ color: 'white' }]}
              size={25}
              name={'map'}
            />
          ),
        }}
      />
    </MaterialBottomTabs.Navigator>
  );

  const createTopTabs = (props: { name: string }) => (
    <MaterialTopTabs.Navigator>
      <MaterialTopTabs.Screen
        name='Tab 1'
        component={Tab1}
        options={{ title: props.route.params.name }}
      />
      <MaterialTopTabs.Screen name='Tab 2' component={Tab2} />
      <MaterialTopTabs.Screen name='Tab 3' component={Tab3} />
    </MaterialTopTabs.Navigator>
  );
  return (
    <AppearanceProvider>
      <NavigationContainer
        theme={colorScheme == 'dark' ? DarkTheme : MyTheme}
      >
        <Drawer.Navigator>
          <Drawer.Screen name='Home' children={createHomeStack} />
          <Drawer.Screen name='Contacts' component={Screen1} />
          <Drawer.Screen name='Favorites' component={Screen2} />
          <Drawer.Screen name='Settings' component={Screen3} />
        </Drawer.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}
