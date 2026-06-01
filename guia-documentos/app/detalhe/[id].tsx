// app/detalhe/[id].tsx
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { buscarDocumentoPorId } from '../../services/api';
import { useFavoritosStore } from '../../store/useFavoritosStore';

// ← ADICIONE ISTO
type Documento = {
  objectId: string;
  nome: string;
  categoria: string;
  descricao?: string;
  requisitos?: string;
  prazo?: string;
};
// ← FIM

export default function DetalheScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [documento, setDocumento] = useState<Documento | null>(null); // ← ADICIONE <Documento | null>
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null); // ← ADICIONE <string | null>

  const favoritos = useFavoritosStore((s) => s.favoritos);
  const adicionarFavorito = useFavoritosStore((s) => s.adicionarFavorito);
  const removerFavorito = useFavoritosStore((s) => s.removerFavorito);

  useEffect(() => {
    if (id) {
      buscarDocumentoPorId(id as string)
        .then(setDocumento)
        .catch((e: Error) => setErro(e.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <View style={s.telaCarregando}>
        <ActivityIndicator size="large" color="#0891b2" />
      </View>
    );
  }

  if (erro || !documento) {
    return (
      <View style={s.telaErro}>
        <Ionicons name="alert-circle" size={48} color="#dc2626" />
        <Text style={s.textoErro}>Erro ao carregar documento</Text>
        <Pressable style={s.botaoVoltar} onPress={() => router.back()}>
          <Text style={s.textoVoltar}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  if (!documento) {
    return null;
  }

  const isFavorito = favoritos.has(documento.objectId);

  function handleToggleFavorito() {
    if (!documento) return;
    if (isFavorito) {
      removerFavorito(documento.objectId);
    } else {
      adicionarFavorito(documento.objectId);
    }
  }

  return (
    <ScrollView style={s.tela} contentContainerStyle={s.conteudo}>
      <View style={s.cabecalho}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#0891b2" />
        </Pressable>
        <Pressable onPress={handleToggleFavorito}>
          <Ionicons
            name={isFavorito ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorito ? '#dc2626' : '#94a3b8'}
          />
        </Pressable>
      </View>

      <View style={s.card}>
        <Text style={s.categoria}>{documento.categoria}</Text>
        <Text style={s.nome}>{documento.nome}</Text>

        {documento.descricao && (
          <View style={s.secao}>
            <Text style={s.secaoTitulo}>Descrição</Text>
            <Text style={s.secaoTexto}>{documento.descricao}</Text>
          </View>
        )}

        {documento.requisitos && (
          <View style={s.secao}>
            <Text style={s.secaoTitulo}>Requisitos</Text>
            <Text style={s.secaoTexto}>{documento.requisitos}</Text>
          </View>
        )}

        {documento.prazo && (
          <View style={s.secao}>
            <Text style={s.secaoTitulo}>Prazo</Text>
            <Text style={s.secaoTexto}>{documento.prazo}</Text>
          </View>
        )}
      </View>

      <Pressable style={s.botao}>
        <Ionicons name="download" size={20} color="#fff" />
        <Text style={s.botaoTexto}>Solicitar Documento</Text>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  conteudo: {
    padding: 16,
    paddingBottom: 32,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  categoria: {
    fontSize: 12,
    color: '#0891b2',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 16,
  },
  secao: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#cbd5e1',
  },
  secaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  secaoTexto: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  botao: {
    backgroundColor: '#0891b2',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  telaCarregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
  telaErro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: 24,
  },
  textoErro: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc2626',
    marginTop: 12,
    textAlign: 'center',
  },
  botaoVoltar: {
    backgroundColor: '#0891b2',
    borderRadius: 10,
    padding: 12,
    marginTop: 20,
  },
  textoVoltar: {
    color: '#fff',
    fontWeight: 'bold',
  },
});