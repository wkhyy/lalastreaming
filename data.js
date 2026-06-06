const STORE_DEFAULT = {
  password: "123456",
  store: {
    title: "LalaStreaming",
    subtitle: "Tus plataformas favoritas en un solo lugar",
    description: "Compra rápido, paga por Yape o Plin y recibe soporte durante la vigencia del servicio.",
    whatsapp: "968335649",
    exchangeRate: 3.75,
    whatsappMessage: "Hola, quiero comprar {producto}. ¿Está disponible?",
    yape: "968335649",
    plin: "968335649",
    terms: "🗓️ Vigencia según el servicio contratado.\n🔑 No cambiar datos de acceso ni seguridad.\n🚫 No hay devoluciones después de la entrega.\n🛠️ Soporte durante la vigencia del servicio.\n⚠️ Al recibir el acceso, el cliente acepta estos términos."
  },
  banners: [
    { title: "🔥 Promos de la semana", text: "Consulta combos especiales por WhatsApp", active: true },
    { title: "🎬 Streaming al mejor precio", text: "Netflix, Disney+, Prime, Max y más", active: true },
    { title: "💳 Paga fácil", text: "Aceptamos Yape y Plin", active: true }
  ],
  products: [
    { name:"Netflix", desc:"Cuenta o perfil por 30 días.", price:"15", image:"", logo:"NETFLIX", color:"#e50914", offer:true, active:true },
    { name:"Disney+", desc:"Entretenimiento familiar y estrenos.", price:"10", image:"", logo:"Disney+", color:"#16a6ff", offer:true, active:true },
    { name:"Crunchyroll", desc:"Anime, estrenos y series populares.", price:"10", image:"", logo:"Crunchyroll", color:"#f47521", offer:false, active:true },
    { name:"Prime Video", desc:"Películas, series y contenido exclusivo.", price:"10", image:"", logo:"Prime Video", color:"#00a8e1", offer:true, active:true },
    { name:"Max / HBO", desc:"Series premium, películas y estrenos.", price:"12", image:"", logo:"MAX", color:"#6f5cff", offer:false, active:true },
    { name:"YouTube Premium", desc:"Videos y música sin interrupciones.", price:"12", image:"", logo:"YouTube", color:"#ff0033", offer:false, active:true },
    { name:"Spotify Premium", desc:"Música sin anuncios y descargas.", price:"12", image:"", logo:"Spotify", color:"#1db954", offer:true, active:true },
    { name:"Canva Pro", desc:"Diseños, plantillas y herramientas premium.", price:"10", image:"", logo:"Canva", color:"#7d2ae8", offer:false, active:true },
    { name:"Office 365", desc:"Word, Excel, PowerPoint y más.", price:"50", image:"", logo:"Microsoft 365", color:"#f25022", offer:false, active:true }
  ]
};
function loadData(){ const saved = localStorage.getItem("lalastreaming_pro_data"); return saved ? JSON.parse(saved) : structuredClone(STORE_DEFAULT); }
function saveData(data){ localStorage.setItem("lalastreaming_pro_data", JSON.stringify(data)); }
function soles(price){ const n = parseFloat(String(price).replace(",", ".")); return Number.isFinite(n) ? n : 0; }
