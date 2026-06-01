// app/(tabs)/favoritos.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import DocumentoCard from '../../components/DocumentoCard';
import { buscarDocumentos } from '../../services/api';
import { useFavoritosStore } from '../../store/useFavoritosStore';

// ← ADICIONE ISTO
type Documento = {
  objectId: string;
  nome: string;
  categoria: string;
};
// ← FIM

export default function FavoritosScreen() {
  const router = useRouter();
  const [documentos, setDocumentos] = useState<Documento[]>([]); // ← ADICIONE <Documento[]>
  const [loading, setLoading] = useState(true);

  const favoritos = useFavoritosStore((s) => s.favoritos);
  const removerFavorito = useFavoritosStore((s) => s.removerFavorito);

  useEffect(() => {
    buscarDocumentos()
      .then(setDocumentos)
      .finally(() => setLoading(false));
  }, []);

  const documentosFavoritos = documentos.filter((d) =>
    favoritos.has(d.objectId)
  );

  if (loading) {
    return (
      <View style={s.telaCarregando}>
        <ActivityIndicator size="large" color="#0891b2" />
      </View>
    );
  }

  return (
    <View style={s.tela}>
      <FlatList
        data={documentosFavoritos}
        keyExtractor={(item) => item.objectId}
        contentContainerStyle={s.lista}
        renderItem={({ item }) => (
          <DocumentoCard
            nome={item.nome}
            categoria={item.categoria}
            isFavorito={true}
            onPress={() => router.push(`/detalhe/${item.objectId}`)}
            onToggleFavorito={() => removerFavorito(item.objectId)}
          />
        )}
        ListHeaderComponent={() => (
          <View style={s.cabecalho}>
            <Text style={s.titulo}>❤️ Favoritos</Text>
            <Text style={s.subtitulo}>
              {documentosFavoritos.length} documento
              {documentosFavoritos.length !== 1 ? 's' : ''}
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={s.vazio}>
            <Ionicons name="heart-outline" size={48} color="#cbd5e1" />
            <Text style={s.textoVazio}>Nenhum favorito ainda</Text>
            <Text style={s.dica}>
              Favorite documentos nas outras abas para acessá-los aqui
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  lista: {
    padding: 16,
    paddingBottom: 32,
  },
  telaCarregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
  cabecalho: {
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#64748b',
  },
  vazio: {
    alignItems: 'center',
    marginTop: 60,
  },
  textoVazio: {
    fontSize: 15,
    color: '#94a3b8',
    marginTop: 12,
  },
  dica: {
    fontSize: 13,
    color: '#cbd5e1',
    marginTop: 6,
    textAlign: 'center',
  },
});