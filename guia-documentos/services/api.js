// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACK4APP_URL,
  headers: {
    'X-Parse-Application-Id': process.env.EXPO_PUBLIC_BACK4APP_APP_ID,
    'X-Parse-REST-API-Key': process.env.EXPO_PUBLIC_BACK4APP_API_KEY,
  },
});

export async function buscarDocumentos() {
  const r = await api.get('/classes/Documento');
  return r.data.results;
}

// Busca um documento específico por ID
export async function buscarDocumentoPorId(id) {
  const r = await api.get(`/classes/Documento/${id}`);
  return r.data;
}

// Adicionar no services/api.js, após as funções existentes

export async function loginUsuario({ username, password }) {
  const r = await api.get('/login', { params: { username, password } });
  return r.data; // retorna { objectId, username, email, sessionToken, ... }
}

export async function cadastrarUsuario({ username, email, password }) {
  const r = await api.post('/users', { username, email, password });
  // Back4App retorna 201 com objectId e sessionToken
  return r.data;
}

export async function logoutUsuario(sessionToken) {
  await api.post('/logout', {}, {
    headers: { 'X-Parse-Session-Token': sessionToken },
  });
}