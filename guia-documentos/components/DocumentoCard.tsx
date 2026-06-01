// components/DocumentoCard.tsx
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type DocumentoCardProps = {
  nome: string;
  categoria: string;
  onPress: () => void;
  isFavorito?: boolean;
  onToggleFavorito?: () => void;
};

export default function DocumentoCard({
  nome,
  categoria,
  onPress,
  isFavorito = false,
  onToggleFavorito,
}: DocumentoCardProps) {
  const iconePorCategoria: Record<string, keyof typeof Ionicons.glyphMap> = {
    Identificação: 'id-card',
    Habilitação: 'car',
    Trabalho: 'briefcase',
    Viagem: 'airplane',
  };

  const icone = iconePorCategoria[categoria] || 'document-text';

  return (
    <Pressable style={s.card} onPress={onPress}>
      <View style={s.conteudo}>
        <View style={s.iconContainer}>
          <Ionicons name={icone} size={32} color="#fff" />
        </View>
        <View style={s.texto}>
          <Text style={s.categoria} numberOfLines={1}>
            {categoria}
          </Text>
          <Text style={s.nome} numberOfLines={2}>
            {nome}
          </Text>
        </View>
      </View>
      {onToggleFavorito && (
        <Pressable onPress={onToggleFavorito} style={s.favoritoBtn}>
          <Ionicons
            name={isFavorito ? 'star' : 'star-outline'}
            size={20}
            color={isFavorito ? '#fbbf24' : '#cbd5e1'}
          />
        </Pressable>
      )}
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  conteudo: {
    width: '100%',
    marginBottom: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#0891b2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  texto: {
    flex: 1,
  },
  categoria: {
    fontSize: 10,
    color: '#0891b2',
    fontWeight: '600',
    marginBottom: 2,
  },
  nome: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#001632',
  },
  favoritoBtn: {
    alignSelf: 'flex-end',
    padding: 4,
  },
});