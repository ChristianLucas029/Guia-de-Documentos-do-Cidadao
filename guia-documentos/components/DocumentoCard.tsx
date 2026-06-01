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
        <Ionicons name={icone} size={24} color="#0891b2" style={s.icone} />
        <View style={s.texto}>
          <Text style={s.nome}>{nome}</Text>
          <Text style={s.categoria}>{categoria}</Text>
        </View>
      </View>
      {onToggleFavorito && (
        <Pressable onPress={onToggleFavorito}>
          <Ionicons
            name={isFavorito ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorito ? '#dc2626' : '#cbd5e1'}
          />
        </Pressable>
      )}
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  conteudo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icone: {
    marginRight: 12,
  },
  texto: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  categoria: {
    fontSize: 13,
    color: '#64748b',
  },
});