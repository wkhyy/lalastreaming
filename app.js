const data = loadData();
let currency = "PEN";
let query = "";
let selectedCategory = "all";
const store = data.store;

title.textContent = store.title;
subtitle.textContent = store.subtitle;
description.textContent = store.description;
waTop.href = `https://wa.me/51${store.whatsapp}`;
floatWa.href = `https://wa.me/51${store.whatsapp}?text=${encodeURIComponent("Hola, quiero información")}`;
if (typeof buyNowFloat !== "undefined") buyNowFloat.href = `https://wa.me/51${store.whatsapp}?text=${encodeURIComponent("Hola, quiero comprar una plataforma")}`;
if (typeof featuredWa !== "undefined") featuredWa.href = `https://wa.me/51${store.whatsapp}?text=${encodeURIComponent("Hola, quiero consultar la oferta destacada de Netflix")}`;
terms.innerHTML = store.terms.split("\n").map(t => `<p>${t}</p>`).join("");
yapeNumber.textContent = store.yape || store.whatsapp;
plinNumber.textContent = store.plin || store.whatsapp;
if (typeof clientsCounter !== "undefined") clientsCounter.textContent = "+" + (store.clientsCount || 250);

function categoryName(id){
  return (data.categories.find(c => c.id === id) || {name:"Sin categoría"}).name;
}
function renderBanners(){
  const activeBanners = (data.banners || []).filter(b => b.active);
  const carousel = document.getElementById("promoCarousel");

  if (carousel) {
    carousel.innerHTML = "";

    activeBanners.forEach(b => {
      carousel.innerHTML += `
        <div class="carousel-item">
          <strong>${b.title}</strong>
          <span>${b.text}</span>
        </div>
      `;
    });

    carousel.innerHTML += `
      <div class="carousel-item client-slide">
        <strong>⭐ +50 clientes satisfechos</strong>
        <span>Gracias por confiar en LalaStreaming</span>
      </div>
    `;

    carousel.innerHTML += carousel.innerHTML;
  }
}
function priceText(p){
  const n = soles(p.price);
  return currency === "USD" ? "$ " + (n / (Number(store.exchangeRate) || 3.75)).toFixed(2) : "S/ " + n.toFixed(2);
}
function waLink(product){
  const msg = (store.whatsappMessage || "Hola, quiero comprar {producto}.").replaceAll("{producto}", product.name);
  return `https://wa.me/51${store.whatsapp}?text=${encodeURIComponent(msg)}`;
}
function logoBlock(p){ return `<div class="brand-logo" style="--brand:${p.color || '#9b5cff'}">${p.logo || p.name}</div>`; }

function renderFilters(){
  categoryFilters.innerHTML = `<button class="${selectedCategory==='all'?'active':''}" data-cat="all">Todo</button>`;
  data.categories.forEach(c => categoryFilters.innerHTML += `<button class="${selectedCategory===c.id?'active':''}" data-cat="${c.id}">${c.name}</button>`);
  document.querySelectorAll("[data-cat]").forEach(btn => btn.onclick = () => { selectedCategory = btn.dataset.cat; render(); });
}

function productCard(p){
  const img = p.image ? `<img src="${p.image}" class="product-img">` : logoBlock(p);
  return `<article class="card" data-index="${data.products.indexOf(p)}">${p.bestSeller ? `<span class="best-seller">🔥 Más vendido</span>` : (p.offer ? `<span class="offer">OFERTA</span>` : "")}${img}<h3>${p.name}</h3><p>${p.desc}</p><strong>${priceText(p)}</strong><a onclick="event.stopPropagation()" href="${waLink(p)}" target="_blank">Comprar</a></article>`;
}

function render(){
  renderFilters();
  catalogByCategory.innerHTML = "";
  const filtered = data.products
    .filter(p => p.active)
    .filter(p => selectedCategory === "all" || p.category === selectedCategory)
    .filter(p => p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query));

  const cats = selectedCategory === "all" ? data.categories : data.categories.filter(c => c.id === selectedCategory);
  cats.forEach(cat => {
    const products = filtered.filter(p => p.category === cat.id);
    if (!products.length) return;
    catalogByCategory.innerHTML += `<div class="category-section"><h3>${cat.name}</h3><div class="grid">${products.map(productCard).join("")}</div></div>`;
  });

  const uncategorized = filtered.filter(p => !data.categories.some(c => c.id === p.category));
  if (uncategorized.length) catalogByCategory.innerHTML += `<div class="category-section"><h3>Sin categoría</h3><div class="grid">${uncategorized.map(productCard).join("")}</div></div>`;

  document.querySelectorAll(".card").forEach(card => card.onclick = () => openProduct(data.products[card.dataset.index]));
}
function openProduct(p){
  mLogo.innerHTML = p.logo || p.name;
  mLogo.style.setProperty("--brand", p.color || "#9b5cff");
  if(p.image){ mImg.src = p.image; mImg.style.display = "block"; } else { mImg.style.display = "none"; }
  mName.textContent = p.name; mDesc.textContent = p.desc; mPrice.textContent = priceText(p); mWa.href = waLink(p);
  document.body.classList.add("blurred"); modal.classList.add("show");
}
closeModal.onclick = () => { modal.classList.remove("show"); document.body.classList.remove("blurred"); };
modal.onclick = e => { if(e.target === modal) closeModal.click(); };
currencyBtn.onclick = () => {
  currency = currency === "PEN" ? "USD" : "PEN";
  currencyBtn.innerHTML = currency === "PEN" ? "💵 Ver precios en USD" : "🇵🇪 Ver precios en Soles";
  render();
};
search.oninput = () => { query = search.value.toLowerCase().trim(); render(); };
renderBanners(); render();
