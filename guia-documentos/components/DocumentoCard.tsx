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
          <Text style={s.categoria}>{categoria}</Text>
          <Text style={s.nome}>{nome}</Text>
        </View>
      </View>
      {onToggleFavorito && (
        <Pressable onPress={onToggleFavorito} style={s.favoritoBtn}>
          <Ionicons
            name={isFavorito ? 'star' : 'star-outline'}
            size={24}
            color={isFavorito ? '#fbbf24' : '#cbd5e1'}
          />
        </Pressable>
      )}
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minHeight: 100,
  },
  conteudo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#0891b2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    flex: 1,
  },
  categoria: {
    fontSize: 11,
    color: '#0891b2',
    fontWeight: '600',
    marginBottom: 4,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  favoritoBtn: {
    padding: 8,
  },
});