// store/useFavoritosStore.ts
import { create } from 'zustand';

type FavoritosState = {
  favoritos: Set<string>;
  adicionarFavorito: (id: string) => void;
  removerFavorito: (id: string) => void;
  limpar: () => void;
};

export const useFavoritosStore = create<FavoritosState>((set) => ({
  favoritos: new Set(),
  adicionarFavorito: (id) =>
    set((state) => {
      const novo = new Set(state.favoritos);
      novo.add(id);
      return { favoritos: novo };
    }),
  removerFavorito: (id) =>
    set((state) => {
      const novo = new Set(state.favoritos);
      novo.delete(id);
      return { favoritos: novo };
    }),
  limpar: () => set({ favoritos: new Set() }),
}));