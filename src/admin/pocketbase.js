import PocketBase from 'pocketbase';

// Reemplaza 'panel-admin-backend' por el nombre exacto de tu servicio de backend en Render
export const pb = new PocketBase('https://panel-admin-frontend-v2st.onrender.com');
export default pb;