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
import DocumentoListCard from '../../components/DocumentoListCard';
import { buscarDocumentos } from '../../services/api';
import { useFavoritosStore } from '../../store/useFavoritosStore';

type Documento = {
  objectId: string;
  nome: string;
  categoria: string;
  orgao_emissor?: string;
};

export default function FavoritosScreen() {
  const router = useRouter();
  const [documentos, setDocumentos] = useState<Documento[]>([]);
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

  // ← ADICIONE ISTO: Componente separado para a lista vazia
  const renderListaVazia = () => (
    <View style={s.vazio}>
      <Ionicons name="star-outline" size={48} color="#cbd5e1" />
      <Text style={s.textoVazio}>Nenhum favorito ainda</Text>
      <Text style={s.dica}>
        Favorite documentos na aba Documentos para acessá-los aqui
      </Text>
    </View>
  );
  // ← FIM

  return (
    <View style={s.tela}>
      <FlatList
        data={documentosFavoritos}
        keyExtractor={(item) => item.objectId}
        contentContainerStyle={s.lista}
        renderItem={({ item }) => (
          <DocumentoListCard
            nome={item.nome}
            categoria={item.categoria}
            orgao_emissor={item.orgao_emissor}
            isFavorito={true}
            onPress={() => router.push(`/detalhe/${item.objectId}`)}
            onToggleFavorito={() => removerFavorito(item.objectId)}
          />
        )}
        ListHeaderComponent={() => (
          <View style={s.cabecalho}>
            <View style={s.tituloContainer}>
              <Ionicons name="star" size={28} color="#fbbf24" />
              <Text style={s.titulo}>Favoritos</Text>
            </View>
            <Text style={s.subtitulo}>
              {documentosFavoritos.length} documento
              {documentosFavoritos.length !== 1 ? 's' : ''}
            </Text>
          </View>
        )}
        ListEmptyComponent={renderListaVazia} 
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
    paddingTop: 16,
    paddingBottom: 120,
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
  tituloContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a2e',
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