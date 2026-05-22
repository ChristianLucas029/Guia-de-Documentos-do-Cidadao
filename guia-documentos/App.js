import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { buscarDocumentos } from './src/services/documentoService';

export default function App() {

  // 🧪 Teste de conexão — remover depois
  useEffect(() => {
    buscarDocumentos().then((docs) => {
      console.log('✅ Documentos carregados:', docs.length);
      console.log(docs);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}