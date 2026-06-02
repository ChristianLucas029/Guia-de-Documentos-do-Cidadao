// app/(auth)/login.tsx
import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, KeyboardAvoidingView,
  Platform, Alert,
} from 'react-native';
import { router } from 'expo-router';
import { loginUsuario } from '@/services/api';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const setUsuario = useAuthStore((s) => s.setUsuario);

  async function handleLogin() {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Preencha usuário e senha.');
      return;
    }
    setLoading(true);
    try {
      const data = await loginUsuario({ username: username.trim(), password });
      setUsuario({
        objectId: data.objectId,
        username: data.username,
        email: data.email,
        sessionToken: data.sessionToken,
      });
      router.replace('/(tabs)');
    } catch (e: any) {
      const msg = e?.response?.data?.error ?? 'Erro ao fazer login.';
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.card}>
        <Text style={styles.titulo}>Guia de Documentos</Text>
        <Text style={styles.subtitulo}>Faça login para continuar</Text>

        <TextInput
          style={styles.input}
          placeholder="Usuário"
          placeholderTextColor="#7da8b5"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#7da8b5"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.botaoTexto}>Entrar</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/(auth)/cadastro')}>
          <Text style={styles.link}>Não tem conta? <Text style={styles.linkDestaque}>Cadastre-se</Text></Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#034e61', justifyContent: 'center', padding: 24 },
  card: { backgroundColor: '#056982', borderRadius: 16, padding: 28, gap: 14 },
  titulo: { color: '#86e9ff', fontSize: 22, fontWeight: '700', textAlign: 'center' },
  subtitulo: { color: '#a8d8e8', fontSize: 14, textAlign: 'center', marginBottom: 8 },
  input: {
    backgroundColor: '#034e61', borderRadius: 10, padding: 14,
    color: '#fff', fontSize: 15, borderWidth: 1, borderColor: '#0891b2',
  },
  botao: {
    backgroundColor: '#0891b2', borderRadius: 10,
    padding: 15, alignItems: 'center', marginTop: 4,
  },
  botaoTexto: { color: '#fff', fontWeight: '700', fontSize: 16 },
  link: { color: '#a8d8e8', textAlign: 'center', marginTop: 8 },
  linkDestaque: { color: '#86e9ff', fontWeight: '700' },
});