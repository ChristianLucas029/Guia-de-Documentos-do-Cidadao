import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ListaScreen from './scr/screens/ListaScreen.js';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <ListaScreen />
    </SafeAreaProvider>
  );
}