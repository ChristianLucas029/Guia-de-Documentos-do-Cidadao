// app/(tabs)/perfil.tsx
import {
  View, Text, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { logoutUsuario } from '@/services/api';

export default function PerfilScreen() {
  const { usuario, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          setLoading(true);
          try {
            if (usuario?.sessionToken) {
              await logoutUsuario(usuario.sessionToken);
            }
          } catch (_) {
            // mesmo se falhar no servidor, limpa local
          } finally {
            await logout();
            router.replace('/(auth)/login');
          }
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={48} color="#86e9ff" />
        </View>

        <Text style={styles.username}>{usuario?.username ?? '—'}</Text>
        <Text style={styles.email}>{usuario?.email ?? '—'}</Text>

        <View style={styles.divisor} />

        <TouchableOpacity
          style={styles.botaoLogout}
          onPress={handleLogout}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="log-out-outline" size={20} color="#fff" />
              <Text style={styles.botaoTexto}>Sair da conta</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#034e61',
    justifyContent: 'center', padding: 24,
  },
  card: {
    backgroundColor: '#056982', borderRadius: 16,
    padding: 28, alignItems: 'center', gap: 12,
  },
  avatar: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: '#034e61', justifyContent: 'center',
    alignItems: 'center', marginBottom: 8,
  },
  username: { color: '#86e9ff', fontSize: 20, fontWeight: '700' },
  email: { color: '#a8d8e8', fontSize: 14 },
  divisor: {
    width: '100%', height: 1,
    backgroundColor: '#0891b2', marginVertical: 8,
  },
  botaoLogout: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#b22222', borderRadius: 10,
    padding: 14, width: '100%', justifyContent: 'center',
  },
  botaoTexto: { color: '#fff', fontWeight: '700', fontSize: 15 },
});