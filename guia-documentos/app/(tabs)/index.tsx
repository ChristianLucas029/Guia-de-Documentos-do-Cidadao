// app/(tabs)/index.tsx
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { buscarDocumentos } from '../../services/api';

type Documento = {
  objectId: string;
  nome: string;
  categoria: string;
};

export default function HomeScreen() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    buscarDocumentos()
      .then(setDocumentos)
      .catch((e: Error) => setErro(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={s.container}>
        <ActivityIndicator size="large" color="#0891b2" />
        <Text style={s.texto}>Carregando...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={s.container}>
        <Text style={s.erro}>❌ Erro: {erro}</Text>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <FlatList
        data={documentos}
        keyExtractor={(item) => item.objectId}
        renderItem={({ item }) => (
          <View style={s.card}>
            <Text style={s.nome}>{item.nome}</Text>
            <Text style={s.categoria}>{item.categoria}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <Text style={s.titulo}>
            ✅ Conectado! ({documentos.length} documentos)
          </Text>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2da000',
    marginBottom: 16,
    textAlign: 'center',
  },
  texto: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 12,
  },
  erro: {
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  nome: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#001b47',
  },
  categoria: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },
});