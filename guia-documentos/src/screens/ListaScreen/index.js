import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { buscarDocumentos } from '../../services/documentoService';

export default function ListaScreen() {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDocumentos();
  }, []);

  async function carregarDocumentos() {
    try {
      const dados = await buscarDocumentos();
      console.log('📋 Dados recebidos:', dados);
      setDocumentos(dados);
    } catch (erro) {
      console.log('❌ Erro:', erro);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={documentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>Categoria: {item.categoria}</Text>
            <Text>Órgão: {item.orgao_emissor}</Text>
            <Text>Custo: {item.custo}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text>Nenhum documento encontrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F7FA',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#1565C0',
  },
});