import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// -------------------------------------------------------
// 🗂️ Dados fictícios — substituir pelo Back4App depois
// -------------------------------------------------------
const DOCUMENTOS = [
  {
    id: '1',
    nome: 'RG',
    orgao_emissor: 'Secretaria de Segurança Pública',
    categoria: 'Identificação',
    documentos_necessarios: 'Certidão de Nascimento ou Casamento',
    custo: 'Gratuito (1ª via)',
    prazo_emissao: '30 dias',
    onde_emitir: 'Posto do ITEP ou SFP',
    link_agendamento: 'https://www.itep.rn.gov.br',
  },
  {
    id: '2',
    nome: 'CPF',
    orgao_emissor: 'Receita Federal',
    categoria: 'Identificação',
    documentos_necessarios: 'RG ou Certidão de Nascimento',
    custo: 'Gratuito',
    prazo_emissao: 'Imediato',
    onde_emitir: 'Agências dos Correios, Banco do Brasil ou online',
    link_agendamento: 'https://www.gov.br/receitafederal',
  },
  {
    id: '3',
    nome: 'CNH',
    orgao_emissor: 'DETRAN',
    categoria: 'Habilitação',
    documentos_necessarios: 'RG, CPF, Comprovante de residência',
    custo: 'R$ 1.300 a R$ 2.000 aprox.',
    prazo_emissao: '6 a 12 meses',
    onde_emitir: 'DETRAN do seu estado',
    link_agendamento: 'https://www.detran.pe.gov.br',
  },
  {
    id: '4',
    nome: 'Título de Eleitor',
    orgao_emissor: 'Tribunal Superior Eleitoral',
    categoria: 'Identificação',
    documentos_necessarios: 'RG, CPF, Comprovante de residência',
    custo: 'Gratuito',
    prazo_emissao: 'Imediato',
    onde_emitir: 'Cartório Eleitoral ou online',
    link_agendamento: 'https://www.tse.jus.br',
  },
  {
    id: '5',
    nome: 'Carteira de Trabalho',
    orgao_emissor: 'Ministério do Trabalho',
    categoria: 'Trabalho',
    documentos_necessarios: 'RG, CPF, Foto 3x4',
    custo: 'Gratuito',
    prazo_emissao: 'Imediato (versão digital)',
    onde_emitir: 'App CTPS Digital ou gov.br',
    link_agendamento: 'https://www.gov.br/trabalho',
  },
  {
    id: '6',
    nome: 'Passaporte',
    orgao_emissor: 'Polícia Federal',
    categoria: 'Viagem',
    documentos_necessarios: 'RG, CPF, Título de Eleitor, Foto 5x7',
    custo: 'R$ 257,25',
    prazo_emissao: '6 dias úteis',
    onde_emitir: 'Delegacia da Polícia Federal',
    link_agendamento: 'https://www.pf.gov.br',
  },
  {
    id: '7',
    nome: 'Certidão de Nascimento',
    orgao_emissor: 'Cartório de Registro Civil',
    categoria: 'Identificação',
    documentos_necessarios: 'Declaração de nascido vivo',
    custo: 'Gratuito (1ª via)',
    prazo_emissao: '15 dias',
    onde_emitir: 'Cartório de Registro Civil',
    link_agendamento: 'https://www.registrocivil.org.br',
  },
  {
    id: '8',
    nome: 'NIS',
    orgao_emissor: 'Caixa Econômica Federal',
    categoria: 'Trabalho',
    documentos_necessarios: 'RG, CPF, Comprovante de residência',
    custo: 'Gratuito',
    prazo_emissao: 'Imediato',
    onde_emitir: 'Agência da Caixa ou CRAS',
    link_agendamento: 'https://www.caixa.gov.br',
  },
  {
    id: '9',
    nome: 'Cartão SUS',
    orgao_emissor: 'Ministério da Saúde',
    categoria: 'Identificação',
    documentos_necessarios: 'RG ou CPF',
    custo: 'Gratuito',
    prazo_emissao: 'Imediato',
    onde_emitir: 'Unidade Básica de Saúde (UBS)',
    link_agendamento: 'https://www.gov.br/saude',
  },
  {
    id: '10',
    nome: 'CTPS Digital',
    orgao_emissor: 'Ministério do Trabalho',
    categoria: 'Trabalho',
    documentos_necessarios: 'CPF',
    custo: 'Gratuito',
    prazo_emissao: 'Imediato',
    onde_emitir: 'App CTPS Digital',
    link_agendamento: 'https://www.gov.br/trabalho',
  },
];

// -------------------------------------------------------
// 🎨 Ícones e cores por categoria
// -------------------------------------------------------
const CATEGORIA_CONFIG = {
  Identificação: { icone: 'badge',         cor: '#2196F3' },
  Habilitação:   { icone: 'directions-car', cor: '#FF9800' },
  Trabalho:      { icone: 'work',           cor: '#4CAF50' },
  Viagem:        { icone: 'flight',         cor: '#9C27B0' },
};

const CATEGORIAS = ['Todas', 'Identificação', 'Habilitação', 'Trabalho', 'Viagem'];

// -------------------------------------------------------
// 🧩 Componente do Card de Documento
// -------------------------------------------------------
function DocumentoCard({ documento }) {
  const config = CATEGORIA_CONFIG[documento.categoria] || {
    icone: 'description',
    cor: '#607D8B',
  };

  return (
    <TouchableOpacity style={styles.card}>
      {/* Ícone colorido por categoria */}
      <View style={[styles.cardIcone, { backgroundColor: config.cor + '20' }]}>
        <MaterialIcons name={config.icone} size={28} color={config.cor} />
      </View>

      {/* Informações do documento */}
      <View style={styles.cardInfo}>
        <Text style={styles.cardNome}>{documento.nome}</Text>
        <Text style={styles.cardOrgao}>{documento.orgao_emissor}</Text>

        {/* Badge de categoria */}
        <View style={[styles.badge, { backgroundColor: config.cor + '20' }]}>
          <Text style={[styles.badgeTexto, { color: config.cor }]}>
            {documento.categoria}
          </Text>
        </View>
      </View>

      {/* Seta de navegação */}
      <MaterialIcons name="chevron-right" size={24} color="#CCC" />
    </TouchableOpacity>
  );
}

// -------------------------------------------------------
// 📱 Tela Principal — Lista de Documentos
// -------------------------------------------------------
export default function ListaScreen() {
  const [busca, setBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');

  // Filtra por categoria e busca simultaneamente
  const documentosFiltrados = DOCUMENTOS.filter((doc) => {
    const matchBusca = doc.nome
      .toLowerCase()
      .includes(busca.toLowerCase());

    const matchCategoria =
      categoriaSelecionada === 'Todas' ||
      doc.categoria === categoriaSelecionada;

    return matchBusca && matchCategoria;
  });

  return (
    <SafeAreaView style={styles.container}>

      {/* ── Cabeçalho ── */}
      <View style={styles.header}>
        <MaterialIcons name="folder-special" size={28} color="#FFF" />
        <Text style={styles.headerTitulo}>Guia de Documentos</Text>
      </View>

      {/* ── Campo de Busca ── */}
      <View style={styles.buscaContainer}>
        <MaterialIcons name="search" size={20} color="#999" />
        <TextInput
          style={styles.buscaInput}
          placeholder="Buscar documento..."
          placeholderTextColor="#999"
          value={busca}
          onChangeText={setBusca}
        />
        {/* Botão para limpar busca */}
        {busca.length > 0 && (
          <TouchableOpacity onPress={() => setBusca('')}>
            <MaterialIcons name="close" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* ── Filtros de Categoria ── */}
      <FlatList
        horizontal
        data={CATEGORIAS}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtrosContainer}
        renderItem={({ item }) => {
          const ativo = item === categoriaSelecionada;
          return (
            <TouchableOpacity
              style={[styles.filtroBotao, ativo && styles.filtroBotaoAtivo]}
              onPress={() => setCategoriaSelecionada(item)}
            >
              <Text
                style={[styles.filtroTexto, ativo && styles.filtroTextoAtivo]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* ── Lista de Documentos ── */}
      <FlatList
        data={documentosFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listaContainer}
        showsVerticalScrollIndicator={false}
        // Mensagem quando nenhum resultado é encontrado
        ListEmptyComponent={
          <View style={styles.vazio}>
            <MaterialIcons name="search-off" size={48} color="#CCC" />
            <Text style={styles.vazioTexto}>Nenhum documento encontrado</Text>
          </View>
        }
        renderItem={({ item }) => <DocumentoCard documento={item} />}
      />

    </SafeAreaView>
  );
}

// -------------------------------------------------------
// 🎨 Estilos
// -------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  // Header
  header: {
    backgroundColor: '#1565C0',
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitulo: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Busca
  buscaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buscaInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },

  // Filtros
  filtrosContainer: {
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 8,
  },
  filtroBotao: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    marginRight: 8,
  },
  filtroBotaoAtivo: {
    backgroundColor: '#1565C0',
    borderColor: '#1565C0',
  },
  filtroTexto: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  filtroTextoAtivo: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  // Lista
  listaContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  // Card
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
  cardIcone: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
    gap: 4,
  },
  cardNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  cardOrgao: {
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

  // Vazio
  vazio: {
    alignItems: 'center',
    marginTop: 60,
    gap: 12,
  },
  vazioTexto: {
    fontSize: 15,
    color: '#AAA',
  },
});