const STORE_DEFAULT = {
  password: "123456",
  store: {
    title: "LalaStreaming",
    subtitle: "Plataformas digitales al mejor precio",
    description: "Compra fácil, rápido y con soporte durante la vigencia del servicio.",
    whatsapp: "968335649",
    exchangeRate: 3.75,
    whatsappMessage: "Hola, quiero comprar {producto}. ¿Está disponible?",
    terms: "🗓️ Vigencia según el servicio contratado.\n🔑 No cambiar datos de acceso ni seguridad.\n🚫 No hay devoluciones después de la entrega.\n🛠️ Soporte durante la vigencia del servicio.\n⚠️ Al recibir el acceso, el cliente acepta estos términos."
  },
  products: [
    { name:"Netflix", desc:"Cuenta o perfil por 30 días.", price:"15", image:"", active:true },
    { name:"Disney+", desc:"Entretenimiento familiar y estrenos.", price:"10", image:"", active:true },
    { name:"Crunchyroll", desc:"Anime, estrenos y series populares.", price:"10", image:"", active:true },
    { name:"Prime Video", desc:"Películas, series y contenido exclusivo.", price:"10", image:"", active:true },
    { name:"Max / HBO", desc:"Series premium, películas y estrenos.", price:"12", image:"", active:true },
    { name:"YouTube Premium", desc:"Videos y música sin interrupciones.", price:"12", image:"", active:true },
    { name:"Spotify Premium", desc:"Música sin anuncios y descargas.", price:"12", image:"", active:true },
    { name:"Canva Pro", desc:"Diseños, plantillas y herramientas premium.", price:"10", image:"", active:true },
    { name:"Office 365", desc:"Word, Excel, PowerPoint y más.", price:"50", image:"", active:true }
  ]
};

function loadData(){
  const saved = localStorage.getItem("lalastreaming_pro_data");
  return saved ? JSON.parse(saved) : structuredClone(STORE_DEFAULT);
}

function saveData(data){
  localStorage.setItem("lalastreaming_pro_data", JSON.stringify(data));
}

function soles(price){
  const n = parseFloat(String(price).replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}
