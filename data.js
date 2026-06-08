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
    clientsCount: 250,
    terms: "🗓️ Vigencia según el servicio contratado.\n🔑 No cambiar datos de acceso ni seguridad.\n🚫 No hay devoluciones después de la entrega.\n🛠️ Soporte durante la vigencia del servicio.\n⚠️ Al recibir el acceso, el cliente acepta estos términos.",
    featuredOffer: { badge:"🔥 Oferta destacada", title:"Netflix Premium disponible", text:"Consulta stock, vigencia y entrega inmediata por WhatsApp.", image:"imagenes/netflix.png", buttonText:"📲 Consultar oferta", whatsappText:"Hola, quiero consultar la oferta destacada de Netflix Premium. ¿Tienen disponibilidad?" }
  },
  categories: [
    { id: "streaming", name: "Streaming" },
    { id: "musica", name: "Música" },
    { id: "productividad", name: "Productividad" },
    { id: "edicion", name: "Edición" }
  ],
  banners: [
    { title: "🔥 Promos de la semana", text: "Consulta combos especiales por WhatsApp", active: true },
    { title: "🎬 Streaming al mejor precio", text: "Netflix, Disney+, Prime, Max y más", active: true },
    { title: "💳 Paga fácil", text: "Aceptamos Yape y Plin", active: true }
  ],
  products: [
    { name:"Netflix", category:"streaming", bestSeller:true, desc:"Cuenta o perfil por 30 días.", price:"15", cost:"8", image:"imagenes/netflix.png", logo:"NETFLIX", color:"#e50914", offer:true, active:true },
    { name:"Disney+", category:"streaming", bestSeller:true, desc:"Entretenimiento familiar y estrenos.", price:"10", cost:"5", image:"", logo:"Disney+", color:"#16a6ff", offer:true, active:true },
    { name:"Crunchyroll", category:"streaming", bestSeller:true, desc:"Anime, estrenos y series populares.", price:"10", cost:"5", image:"", logo:"Crunchyroll", color:"#f47521", offer:false, active:true },
    { name:"Prime Video", category:"streaming", desc:"Películas, series y contenido exclusivo.", price:"10", cost:"5", image:"", logo:"Prime Video", color:"#00a8e1", offer:true, active:true },
    { name:"Spotify Premium", category:"musica", desc:"Música sin anuncios y descargas.", price:"12", cost:"7", image:"", logo:"Spotify", color:"#1db954", offer:true, active:true },
    { name:"Canva Pro", category:"productividad", desc:"Diseños, plantillas y herramientas premium.", price:"10", cost:"5", image:"", logo:"Canva", color:"#7d2ae8", offer:false, active:true },
    { name:"Office 365", category:"productividad", desc:"Word, Excel, PowerPoint y más.", price:"50", cost:"25", image:"", logo:"Microsoft 365", color:"#f25022", offer:false, active:true },
    { name:"CapCut Pro", category:"edicion", desc:"Herramientas premium para edición.", price:"10", cost:"5", image:"", logo:"CapCut", color:"#00d4ff", offer:false, active:true }
  ],
  sales: []
};

function loadData(){
  const saved = localStorage.getItem("lalastreaming_pro_data");
  if (!saved) return structuredClone(STORE_DEFAULT);

  try {
    const data = JSON.parse(saved);
    data.store ||= STORE_DEFAULT.store;
    data.store.featuredOffer ||= STORE_DEFAULT.store.featuredOffer;
    data.categories ||= STORE_DEFAULT.categories;
    data.banners ||= STORE_DEFAULT.banners;
    data.products ||= STORE_DEFAULT.products;
    data.sales ||= [];
    return data;
  } catch (error) {
    console.error("Error cargando datos locales:", error);
    return structuredClone(STORE_DEFAULT);
  }
}
function saveData(data){ localStorage.setItem("lalastreaming_pro_data", JSON.stringify(data)); }
function soles(price){ const n = parseFloat(String(price).replace(",", ".")); return Number.isFinite(n) ? n : 0; }
function money(n){ return "S/ " + (Number(n) || 0).toFixed(2); }
function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
