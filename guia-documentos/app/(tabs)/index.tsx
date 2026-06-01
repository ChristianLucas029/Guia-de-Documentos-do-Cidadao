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
import DocumentoListCard from '../../components/DocumentoListCard';
import { buscarDocumentos } from '../../services/api';
import { useFavoritosStore } from '../../store/useFavoritosStore';

type Documento = {
  objectId: string;
  nome: string;
  categoria: string;
  descricao?: string;
  orgao_emissor?: string;
  custo?: string;
  prazo?: string;
  documentos_necessarios?: string;
  onde_emitir?: string;
  link_agendamento?: string;
};

const CATEGORIAS = [
  { label: 'Todos', value: '' },
  { label: 'Identificação', value: 'Identificação' },
  { label: 'Habilitação', value: 'Habilitação' },
  { label: 'Trabalho', value: 'Trabalho' },
  { label: 'Viagem', value: 'Viagem' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [documentosFiltrados, setDocumentosFiltrados] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [buscaNome, setBuscaNome] = useState(''); // ← SEPARADO: busca por nome
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(''); // ← SEPARADO: filtro por categoria

  const favoritos = useFavoritosStore((s) => s.favoritos);
  const adicionarFavorito = useFavoritosStore((s) => s.adicionarFavorito);
  const removerFavorito = useFavoritosStore((s) => s.removerFavorito);

  useEffect(() => {
    buscarDocumentos()
      .then(setDocumentos)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  // ← LÓGICA CORRIGIDA: filtrar por categoria OU por nome
  useEffect(() => {
    let resultado = documentos;

    // 1. Filtrar por categoria (se selecionada)
    if (categoriaSelecionada) {
      resultado = resultado.filter((d) => d.categoria === categoriaSelecionada);
    }

    // 2. Filtrar por nome (se digitado)
    if (buscaNome.trim()) {
      resultado = resultado.filter((d) =>
        d.nome.toLowerCase().includes(buscaNome.toLowerCase())
      );
    }

    setDocumentosFiltrados(resultado);
  }, [buscaNome, categoriaSelecionada, documentos]);

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
            value={buscaNome}
            onChangeText={setBuscaNome}
          />
          {buscaNome ? (
            <Pressable onPress={() => setBuscaNome('')}>
              <Ionicons name="close-circle" size={20} color="#94a3b8" />
            </Pressable>
          ) : null}
        </View>
      </View>

      <FlatList
        data={documentosFiltrados}
        keyExtractor={(item) => item.objectId}
        contentContainerStyle={s.lista}
        renderItem={({ item }) => (
          <DocumentoListCard
            nome={item.nome}
            categoria={item.categoria}
            orgao_emissor={item.orgao_emissor}
            isFavorito={favoritos.has(item.objectId)}
            onPress={() => router.push(`/detalhe/${item.objectId}`)}
            onToggleFavorito={() => handleToggleFavorito(item.objectId)}
          />
        )}
        ListHeaderComponent={() => (
          <View style={s.filtrosContainer}>
            <FlatList
              data={CATEGORIAS}
              keyExtractor={(item) => item.value}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={s.filtrosList}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    s.filtroBtn,
                    categoriaSelecionada === item.value && s.filtroBtnAtivo,
                  ]}
                  onPress={() => setCategoriaSelecionada(item.value)}
                >
                  <Text
                    style={[
                      s.filtroTexto,
                      categoriaSelecionada === item.value &&
                        s.filtroTextoAtivo,
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={s.vazio}>
            <Ionicons name="search-outline" size={48} color="#cbd5e1" />
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
    paddingTop: 16,
    paddingBottom: 120,
  },
  filtrosContainer: {
    marginBottom: 16,
  },
  filtrosList: {
    gap: 8,
  },
  filtroBtn: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  filtroBtnAtivo: {
    backgroundColor: '#0891b2',
    borderColor: '#0891b2',
  },
  filtroTexto: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  filtroTextoAtivo: {
    color: '#fff',
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