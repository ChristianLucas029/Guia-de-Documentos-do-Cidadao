// app/_layout.tsx
import { useEffect } from 'react';
import { Stack, router, useSegments } from 'expo-router';
import { useAuthStore } from '@/store/useAuthStore';

export default function RootLayout() {
  const { usuario, carregando, carregarSessao } = useAuthStore();
  const segments = useSegments();

  useEffect(() => {
    carregarSessao();
  }, []);

  useEffect(() => {
    if (carregando) return;

    const naAreaAuth = segments[0] === '(auth)';

    if (!usuario && !naAreaAuth) {
      // Não logado → manda pra login
      router.replace('/(auth)/login');
    } else if (usuario && naAreaAuth) {
      // Já logado → manda pras tabs
      router.replace('/(tabs)');
    }
  }, [usuario, carregando, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}