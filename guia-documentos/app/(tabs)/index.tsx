// app/(tabs)/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import DocumentoCard from '../../components/DocumentoCard';
import { buscarDocumentos } from '../../services/api';
import { useFavoritosStore } from '../../store/useFavoritosStore';

type Documento = {
  objectId: string;
  nome: string;
  categoria: string;
};

export default function HomeScreen() {
  const router = useRouter();
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [documentosFiltrados, setDocumentosFiltrados] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');

  const favoritos = useFavoritosStore((s) => s.favoritos);
  const adicionarFavorito = useFavoritosStore((s) => s.adicionarFavorito);
  const removerFavorito = useFavoritosStore((s) => s.removerFavorito);

  useEffect(() => {
    buscarDocumentos()
      .then(setDocumentos)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (busca.trim()) {
      const filtrados = documentos.filter((d) =>
        d.nome.toLowerCase().includes(busca.toLowerCase())
      );
      setDocumentosFiltrados(filtrados);
    } else {
      setDocumentosFiltrados(documentos);
    }
  }, [busca, documentos]);

  function handleToggleFavorito(id: string) {
    if (favoritos.has(id)) {
      removerFavorito(id);
    } else {
      adicionarFavorito(id);
    }
  }

  if (loading) {
    return (
      <View style={s.telaCarregando}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  // Agrupar documentos em pares
  const documentosEmPares = [];
  for (let i = 0; i < documentosFiltrados.length; i += 2) {
    documentosEmPares.push([
      documentosFiltrados[i],
      documentosFiltrados[i + 1],
    ]);
  }

  return (
    <View style={s.tela}>
      <View style={s.cabecalho}>
        <View style={s.badge}>
          <Ionicons name="shield-checkmark" size={16} color="#fff" />
          <Text style={s.badgeTexto}>Funciona offline</Text>
        </View>
        <Text style={s.titulo}>Guia de Documentos</Text>
        <Text style={s.titulo2}>do Cidadão</Text>
        <Text style={s.subtitulo}>
          Onde emitir, custo, prazo e o que levar — tudo num só lugar.
        </Text>

        <View style={s.campoBusca}>
          <Ionicons
            name="search"
            size={20}
            color="#94a3b8"
            style={s.iconeBusca}
          />
          <TextInput
            style={s.inputBusca}
            placeholder="Buscar documento..."
            placeholderTextColor="#94a3b8"
            value={busca}
            onChangeText={setBusca}
          />
          {busca ? (
            <Pressable onPress={() => setBusca('')}>
              <Ionicons name="close-circle" size={20} color="#94a3b8" />
            </Pressable>
          ) : null}
        </View>
      </View>

      <FlatList
        data={documentosEmPares}
        keyExtractor={(_, index) => `par-${index}`}
        contentContainerStyle={s.lista}
        renderItem={({ item: par }) => (
          <View style={s.linhaCards}>
            {par[0] && (
              <View style={s.cardWrapper}>
                <DocumentoCard
                  nome={par[0].nome}
                  categoria={par[0].categoria}
                  isFavorito={favoritos.has(par[0].objectId)}
                  onPress={() => router.push(`/detalhe/${par[0].objectId}`)}
                  onToggleFavorito={() =>
                    handleToggleFavorito(par[0].objectId)
                  }
                />
              </View>
            )}
            {par[1] && (
              <View style={s.cardWrapper}>
                <DocumentoCard
                  nome={par[1].nome}
                  categoria={par[1].categoria}
                  isFavorito={favoritos.has(par[1].objectId)}
                  onPress={() => router.push(`/detalhe/${par[1].objectId}`)}
                  onToggleFavorito={() =>
                    handleToggleFavorito(par[1].objectId)
                  }
                />
              </View>
            )}
            {!par[1] && <View style={s.cardWrapper} />}
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={s.vazio}>
            <Ionicons name="document-outline" size={48} color="#cbd5e1" />
            <Text style={s.textoVazio}>Nenhum documento encontrado</Text>
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
  telaCarregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0891b2',
  },
  cabecalho: {
    backgroundColor: '#0891b2',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  badgeTexto: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  titulo2: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 20,
  },
  campoBusca: {
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  iconeBusca: {
    marginRight: 8,
  },
  inputBusca: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1a1a2e',
  },
  lista: {
    padding: 16,
    paddingBottom: 32,
  },
  linhaCards: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  cardWrapper: {
    flex: 1,
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
});