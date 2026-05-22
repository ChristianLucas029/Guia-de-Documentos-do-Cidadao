import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CATEGORIA_CONFIG } from '../../constants/categorias';

// -------------------------------------------------------
// 🧩 Card reutilizável de documento
// -------------------------------------------------------
export default function DocumentoCard({ documento, onPress }) {
  const config = CATEGORIA_CONFIG[documento.categoria] || {
    icone: 'description',
    cor: '#607D8B',
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(documento)}>

      {/* Ícone colorido por categoria */}
      <View style={[styles.iconeContainer, { backgroundColor: config.cor + '20' }]}>
        <MaterialIcons name={config.icone} size={28} color={config.cor} />
      </View>

      {/* Informações */}
      <View style={styles.info}>
        <Text style={styles.nome}>{documento.nome}</Text>
        <Text style={styles.orgao}>{documento.orgao_emissor}</Text>
        <View style={[styles.badge, { backgroundColor: config.cor + '20' }]}>
          <Text style={[styles.badgeTexto, { color: config.cor }]}>
            {documento.categoria}
          </Text>
        </View>
      </View>

      {/* Seta */}
      <MaterialIcons name="chevron-right" size={24} color="#CCC" />

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    gap: 12,
  },
  iconeContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    gap: 4,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  orgao: {
    fontSize: 12,
    color: '#888',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 2,
  },
  badgeTexto: {
    fontSize: 11,
    fontWeight: '600',
  },
});
