import Parse from './parseConfig';

// -------------------------------------------------------
// 📋 Busca todos os documentos do Back4App
// -------------------------------------------------------
export async function buscarDocumentos() {
  try {
    const Documento = Parse.Object.extend('Documento');
    const query     = new Parse.Query(Documento);

    query.ascending('nome');
    query.limit(100);

    const resultados = await query.find();

    return resultados.map((doc) => ({
      id:                     doc.id,
      nome:                   doc.get('nome'),
      orgao_emissor:          doc.get('orgao_emissor'),
      categoria:              doc.get('categoria'),
      documentos_necessarios: doc.get('documentos_necessarios'),
      custo:                  doc.get('custo'),
      prazo_emissao:          doc.get('prazo_emissao'),
      onde_emitir:            doc.get('onde_emitir'),
      link_agendamento:       doc.get('link_agendamento'),
    }));

  } catch (erro) {
    console.error('Erro ao buscar documentos:', erro);
    return [];
  }
}