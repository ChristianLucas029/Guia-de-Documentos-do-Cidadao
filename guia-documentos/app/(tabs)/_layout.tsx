// app/(tabs)/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0891b2',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          backgroundColor: '#1a1a2e',
          borderTopColor: '#334155',
          height: 60,
          paddingBottom: 8,
        },
        headerStyle: { backgroundColor: '#1a1a2e' },
        headerTintColor: '#e2e8f0',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Documentos',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'document-text' : 'document-text-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="dicas"
        options={{
          title: 'Dicas',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'bulb' : 'bulb-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      {/* Remover a aba explore */}
    </Tabs>
  );
}