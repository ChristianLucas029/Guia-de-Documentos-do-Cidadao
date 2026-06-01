// app/(tabs)/dicas.tsx
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function DicasScreen() {
  function abrirLink(url: string) {
    Linking.openURL(url).catch(() => {
      alert('Não foi possível abrir o link');
    });
  }

  return (
    <ScrollView style={s.tela} contentContainerStyle={s.conteudo}>
      <Text style={s.titulo}>💡 Dicas e Informações</Text>

      <View style={s.secao}>
        <View style={s.secaoTitulo}>
          <Ionicons name="bulb" size={20} color="#0891b2" />
          <Text style={s.secaoNome}>Dicas Gerais</Text>
        </View>
        <Text style={s.secaoTexto}>
          • Sempre faça cópias dos seus documentos e guarde em local seguro
        </Text>
        <Text style={s.secaoTexto}>
          • Verifique a validade dos seus documentos regularmente
        </Text>
        <Text style={s.secaoTexto}>
          • Mantenha seus dados atualizados nos órgãos públicos
        </Text>
      </View>

      <View style={s.secao}>
        <View style={s.secaoTitulo}>
          <Ionicons name="globe" size={20} color="#0891b2" />
          <Text style={s.secaoNome}>Portal Gov.br</Text>
        </View>
        <Text style={s.secaoTexto}>
          O portal Gov.br centraliza os serviços digitais do governo federal.
        </Text>

        <Pressable
          style={s.botao}
          onPress={() => abrirLink('https://www.gov.br')}
        >
          <Text style={s.botaoTexto}>Acessar Gov.br</Text>
        </Pressable>
      </View>
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
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 24,
  },
  secao: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  secaoTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  secaoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginLeft: 10,
  },
  secaoTexto: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 8,
  },
  botao: {
    backgroundColor: '#0891b2',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});