// 🔥 CONFIGURA AQUÍ TU FIREBASE
// 1) Crea un proyecto en Firebase.
// 2) Ve a Configuración del proyecto > Tus apps > Web.
// 3) Copia el firebaseConfig y reemplaza estos datos.
// 4) Activa Realtime Database en modo prueba para empezar.

const firebaseConfig = {
  apiKey: "PEGA_AQUI_TU_API_KEY",
  authDomain: "PEGA_AQUI_TU_AUTH_DOMAIN",
  databaseURL: "PEGA_AQUI_TU_DATABASE_URL",
  projectId: "PEGA_AQUI_TU_PROJECT_ID",
  storageBucket: "PEGA_AQUI_TU_STORAGE_BUCKET",
  messagingSenderId: "PEGA_AQUI_TU_MESSAGING_SENDER_ID",
  appId: "PEGA_AQUI_TU_APP_ID"
};

// Ruta donde se guardarán los datos de tu tienda
const FIREBASE_STORE_PATH = "lalastreaming/storeData";
