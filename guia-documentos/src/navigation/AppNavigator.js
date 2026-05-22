import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

import ListaScreen     from '../screens/ListaScreen';
import DetalheScreen   from '../screens/DetalheScreen';
import FavoritosScreen from '../screens/FavoritosScreen';
import DicasScreen     from '../screens/DicasScreen';

const Tab   = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack: Lista → Detalhe
function ListaStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Lista"   component={ListaScreen} />
      <Stack.Screen name="Detalhe" component={DetalheScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#1565C0',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            backgroundColor: '#FFF',
            borderTopWidth: 1,
            borderTopColor: '#EEE',
            paddingBottom: 5,
            height: 60,
          },
        }}
      >
        <Tab.Screen
          name="Documentos"
          component={ListaStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="folder-special" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Favoritos"
          component={FavoritosScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="star" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Dicas"
          component={DicasScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="lightbulb" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
