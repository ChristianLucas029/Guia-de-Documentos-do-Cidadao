// store/useAuthStore.ts
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Usuario = {
  objectId: string;
  username: string;
  email: string;
  sessionToken: string;
};

type AuthState = {
  usuario: Usuario | null;
  carregando: boolean;
  setUsuario: (u: Usuario | null) => void;
  carregarSessao: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  usuario: null,
  carregando: true,

  setUsuario: async (u) => {
    if (u) {
      await AsyncStorage.setItem('@usuario', JSON.stringify(u));
    } else {
      await AsyncStorage.removeItem('@usuario');
    }
    set({ usuario: u });
  },

  carregarSessao: async () => {
    try {
      const json = await AsyncStorage.getItem('@usuario');
      if (json) set({ usuario: JSON.parse(json) });
    } catch (_) {}
    finally { set({ carregando: false }); }
  },

  logout: async () => {
    await AsyncStorage.removeItem('@usuario');
    set({ usuario: null });
  },
}));