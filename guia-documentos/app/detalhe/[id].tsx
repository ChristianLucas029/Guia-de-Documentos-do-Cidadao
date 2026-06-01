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

export default function DetalheScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [documento, setDocumento] = useState<Documento | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

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

  const iconePorCategoria: Record<string, keyof typeof Ionicons.glyphMap> = {
    Identificação: 'id-card',
    Habilitação: 'car',
    Trabalho: 'briefcase',
    Viagem: 'airplane',
  };

  const icone = iconePorCategoria[documento.categoria] || 'document-text';

  return (
    <ScrollView style={s.tela}>
      {/* Cabeçalho azul */}
      <View style={s.cabecalho}>
        <View style={s.cabecalhoTop}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <Pressable onPress={handleToggleFavorito}>
          <Ionicons
            name={isFavorito ? 'star' : 'star-outline'}
            size={24}
            color={isFavorito ? '#fbbf24' : '#94a3b8'}
          />
          </Pressable>
        </View>

        <View style={s.iconContainer}>
          <Ionicons name={icone} size={48} color="#fff" />
        </View>

        <Text style={s.categoria}>{documento.categoria}</Text>
        <Text style={s.nome}>{documento.nome}</Text>

        {documento.descricao && (
          <Text style={s.descricao}>{documento.descricao}</Text>
        )}
      </View>

      {/* Conteúdo */}
      <View style={s.conteudo}>
        {documento.orgao_emissor && (
          <View style={s.secao}>
            <View style={s.secaoHeader}>
              <Ionicons name="business" size={20} color="#0891b2" />
              <Text style={s.secaoTitulo}>ÓRGÃO EMISSOR</Text>
            </View>
            <Text style={s.secaoTexto}>{documento.orgao_emissor}</Text>
          </View>
        )}

        {(documento.custo || documento.prazo) && (
          <View style={s.duasColunas}>
            {documento.custo && (
              <View style={[s.secao, s.meia]}>
                <View style={s.secaoHeader}>
                  <Ionicons name="cash" size={20} color="#0891b2" />
                  <Text style={s.secaoTitulo}>CUSTO</Text>
                </View>
                <Text style={s.secaoTexto}>{documento.custo}</Text>
              </View>
            )}

            {documento.prazo && (
              <View style={[s.secao, s.meia]}>
                <View style={s.secaoHeader}>
                  <Ionicons name="time" size={20} color="#0891b2" />
                  <Text style={s.secaoTitulo}>PRAZO</Text>
                </View>
                <Text style={s.secaoTexto}>{documento.prazo}</Text>
              </View>
            )}
          </View>
        )}

        {documento.documentos_necessarios && (
          <View style={s.secao}>
            <View style={s.secaoHeader}>
              <Ionicons name="checkmark-circle" size={20} color="#0891b2" />
              <Text style={s.secaoTitulo}>DOCUMENTOS NECESSÁRIOS</Text>
            </View>
            {documento.documentos_necessarios
              .split('\n')
              .filter((d) => d.trim())
              .map((doc, idx) => (
                <View key={idx} style={s.itemLista}>
                  <Ionicons name="checkmark" size={16} color="#0891b2" />
                  <Text style={s.itemTexto}>{doc.trim()}</Text>
                </View>
              ))}
          </View>
        )}

        {documento.onde_emitir && (
          <View style={s.secao}>
            <View style={s.secaoHeader}>
              <Ionicons name="location" size={20} color="#0891b2" />
              <Text style={s.secaoTitulo}>ONDE EMITIR</Text>
            </View>
            <Text style={s.secaoTexto}>{documento.onde_emitir}</Text>
          </View>
        )}

        {documento.link_agendamento && (
          <Pressable style={s.botao}>
            <Ionicons name="open-outline" size={18} color="#fff" />
            <Text style={s.botaoTexto}>Agendar online</Text>
          </Pressable>
        )}
      </View>

      {/* Margem inferior para não cobrir ícones */}
      <View style={s.espacoFinal} />
    </ScrollView>
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
  cabecalho: {
    backgroundColor: '#0891b2',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  cabecalhoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoria: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    marginBottom: 4,
  },
  nome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  descricao: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
  },
  conteudo: {
    padding: 16,
  },
  secao: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  secaoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  secaoTitulo: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0891b2',
  },
  secaoTexto: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  duasColunas: {
    flexDirection: 'row',
    gap: 12,
  },
  meia: {
    flex: 1,
  },
  itemLista: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  itemTexto: {
    fontSize: 14,
    color: '#64748b',
    flex: 1,
  },
  botao: {
    backgroundColor: '#0891b2',
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  espacoFinal: {
    height: 80, // ← MARGEM INFERIOR para não cobrir ícones da tab bar
  },
});