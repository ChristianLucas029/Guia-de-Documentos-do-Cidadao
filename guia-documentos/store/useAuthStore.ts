// store/useAuthStore.ts
import { create } from 'zustand';

type Usuario = {
  objectId: string;
  username: string;
  email: string;
  sessionToken: string;
};

type AuthState = {
  usuario: Usuario | null;
  setUsuario: (u: Usuario | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  usuario: null,
  setUsuario: (u) => set({ usuario: u }),
}));