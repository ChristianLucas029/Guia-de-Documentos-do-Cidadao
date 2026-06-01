// app/(tabs)/explore.tsx
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

const CATEGORIAS = [
  { label: 'Todos', value: '' },
  { label: 'Identificação', value: 'Identificação' },
  { label: 'Habilitação', value: 'Habilitação' },
  { label: 'Trabalho', value: 'Trabalho' },
  { label: 'Viagem', value: 'Viagem' },
];

export default function ExploreScreen() {
  const router = useRouter();
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [documentosFiltrados, setDocumentosFiltrados] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');

  const favoritos = useFavoritosStore((s) => s.favoritos);
  const adicionarFavorito = useFavoritosStore((s) => s.adicionarFavorito);
  const removerFavorito = useFavoritosStore((s) => s.removerFavorito);

  useEffect(() => {
    buscarDocumentos()
      .then(setDocumentos)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let resultado = documentos;

    if (categoriaSelecionada) {
      resultado = resultado.filter((d) => d.categoria === categoriaSelecionada);
    }

    if (busca.trim()) {
      resultado = resultado.filter((d) =>
        d.nome.toLowerCase().includes(busca.toLowerCase())
      );
    }

    setDocumentosFiltrados(resultado);
  }, [busca, categoriaSelecionada, documentos]);

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
        <ActivityIndicator size="large" color="#0891b2" />
      </View>
    );
  }

  return (
    <View style={s.tela}>
      <FlatList
        data={documentosFiltrados}
        keyExtractor={(item) => item.objectId}
        contentContainerStyle={s.lista}
        renderItem={({ item }) => (
          <DocumentoCard
            nome={item.nome}
            categoria={item.categoria}
            isFavorito={favoritos.has(item.objectId)}
            onPress={() => router.push(`/detalhe/${item.objectId}`)}
            onToggleFavorito={() => handleToggleFavorito(item.objectId)}
          />
        )}
        ListHeaderComponent={() => (
          <View>
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

            <View style={s.filtros}>
              <FlatList
                data={CATEGORIAS}
                keyExtractor={(item) => item.value}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={s.listaFiltros}
                renderItem={({ item }) => (
                  <Pressable
                    style={[
                      s.botaoFiltro,
                      categoriaSelecionada === item.value && s.botaoFiltroAtivo,
                    ]}
                    onPress={() => setCategoriaSelecionada(item.value)}
                  >
                    <Text
                      style={[
                        s.textoFiltro,
                        categoriaSelecionada === item.value &&
                          s.textoFiltroAtivo,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                )}
              />
            </View>

            <View style={s.resultado}>
              <Text style={s.textoResultado}>
                {documentosFiltrados.length} resultado
                {documentosFiltrados.length !== 1 ? 's' : ''}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={s.vazio}>
            <Ionicons name="search-outline" size={48} color="#cbd5e1" />
            <Text style={s.textoVazio}>Nenhum documento encontrado</Text>
            <Text style={s.dica}>Tente outro termo de busca ou categoria</Text>
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
  campoBusca: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
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
  filtros: {
    marginBottom: 16,
  },
  listaFiltros: {
    gap: 8,
  },
  botaoFiltro: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  botaoFiltroAtivo: {
    backgroundColor: '#0891b2',
    borderColor: '#0891b2',
  },
  textoFiltro: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  textoFiltroAtivo: {
    color: '#fff',
  },
  resultado: {
    marginBottom: 12,
  },
  textoResultado: {
    fontSize: 13,
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
  },
});