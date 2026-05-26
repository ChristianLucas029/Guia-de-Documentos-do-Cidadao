// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACK4APP_URL,
  headers: {
    'X-Parse-Application-Id': process.env.EXPO_PUBLIC_BACK4APP_APP_ID,
    'X-Parse-REST-API-Key': process.env.EXPO_PUBLIC_BACK4APP_API_KEY,
  },
});

// Busca todos os documentos
export async function buscarDocumentos() {
  const r = await api.get('/classes/Documento');
  return r.data.results;
}

// Busca documentos por categoria
export async function buscarPorCategoria(categoria) {
  const r = await api.get('/classes/Documento', {
    params: {
      where: JSON.stringify({ categoria }),
      order: 'nome',
    },
  });
  return r.data.results;
}

// Busca um documento específico por ID
export async function buscarDocumentoPorId(id) {
  const r = await api.get(`/classes/Documento/${id}`);
  return r.data;
}

// Funções de autenticação (conforme aula 26/05)
export async function cadastrar(username, email, password) {
  const r = await api.post('/users', { username, email, password });
  return r.data;
}

export async function login(username, password) {
  const r = await api.get('/login', {
    params: { username, password },
  });
  return r.data;
}

export async function logout(sessionToken) {
  await api.post('/logout', {}, {
    headers: { 'X-Parse-Session-Token': sessionToken },
  });
}