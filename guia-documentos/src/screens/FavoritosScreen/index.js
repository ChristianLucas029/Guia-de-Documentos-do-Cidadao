import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FavoritosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>⭐ Tela 3 — Favoritos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F7FA' },
  texto:     { fontSize: 18, fontWeight: 'bold', color: '#1565C0' },
});
