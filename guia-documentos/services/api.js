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