import PocketBase from 'pocketbase';

// Conexión con tu servidor de PocketBase corriendo en puerto 8090
export const pb = new PocketBase('http://127.0.0.1:8090');