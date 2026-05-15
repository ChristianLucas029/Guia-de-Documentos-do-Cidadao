import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Texto Teste</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002c59',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 50,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
