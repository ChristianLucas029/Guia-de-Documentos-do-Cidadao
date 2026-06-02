// app/(auth)/cadastro.tsx
import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, KeyboardAvoidingView,
  Platform, Alert, ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { cadastrarUsuario, loginUsuario } from '@/services/api';
import { useAuthStore } from '@/store/useAuthStore';

export default function CadastroScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [loading, setLoading]   = useState(false);
  const setUsuario = useAuthStore((s) => s.setUsuario);

  async function handleCadastro() {
    if (!username.trim() || !email.trim() || !password || !confirmar) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    if (password !== confirmar) {
      Alert.alert('Atenção', 'As senhas não coincidem.');
      return;
    }
    setLoading(true);
    try {
      await cadastrarUsuario({ username: username.trim(), email: email.trim(), password });
      // Após cadastro, faz login automático
      const data = await loginUsuario({ username: username.trim(), password });
      setUsuario({
        objectId: data.objectId,
        username: data.username,
        email: data.email,
        sessionToken: data.sessionToken,
      });
      router.replace('/(tabs)');
    } catch (e: any) {
      const msg = e?.response?.data?.error ?? 'Erro ao cadastrar.';
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
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.titulo}>Criar Conta</Text>
          <Text style={styles.subtitulo}>Preencha os dados abaixo</Text>

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
            placeholder="E-mail"
            placeholderTextColor="#7da8b5"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#7da8b5"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar senha"
            placeholderTextColor="#7da8b5"
            secureTextEntry
            value={confirmar}
            onChangeText={setConfirmar}
          />

          <TouchableOpacity
            style={styles.botao}
            onPress={handleCadastro}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.botaoTexto}>Cadastrar</Text>
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.link}>Já tem conta? <Text style={styles.linkDestaque}>Faça login</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#034e61' },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 24 },
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