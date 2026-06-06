const data = loadData();
let currency = "PEN";

const store = data.store;
title.textContent = store.title;
subtitle.textContent = store.subtitle;
description.textContent = store.description;
waTop.href = `https://wa.me/51${store.whatsapp}`;
floatWa.href = `https://wa.me/51${store.whatsapp}?text=${encodeURIComponent("Hola, quiero información")}`;
terms.innerHTML = store.terms.split("\n").map(t => `<p>${t}</p>`).join("");

function priceText(p){
  const n = soles(p.price);
  if(currency === "USD"){
    return "$ " + (n / (Number(store.exchangeRate) || 3.75)).toFixed(2);
  }
  return "S/ " + n.toFixed(2);
}

function waLink(product){
  const msg = (store.whatsappMessage || "Hola, quiero comprar {producto}.")
    .replaceAll("{producto}", product.name);
  return `https://wa.me/51${store.whatsapp}?text=${encodeURIComponent(msg)}`;
}

function render(){
  grid.innerHTML = "";
  data.products.filter(p => p.active).forEach((p, i) => {
    const img = p.image ? `<img src="${p.image}" class="product-img">` : `<div class="placeholder">${p.name}</div>`;
    grid.innerHTML += `
      <article class="card" data-index="${data.products.indexOf(p)}">
        ${img}
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <strong>${priceText(p)}</strong>
        <a onclick="event.stopPropagation()" href="${waLink(p)}" target="_blank">Comprar</a>
      </article>`;
  });

  document.querySelectorAll(".card").forEach(card => {
    card.onclick = () => openProduct(data.products[card.dataset.index]);
  });
}

function openProduct(p){
  if(p.image){
    mImg.src = p.image;
    mImg.style.display = "block";
  }else{
    mImg.style.display = "none";
  }
  mName.textContent = p.name;
  mDesc.textContent = p.desc;
  mPrice.textContent = priceText(p);
  mWa.href = waLink(p);
  document.body.classList.add("blurred");
  modal.classList.add("show");
}

closeModal.onclick = () => {
  modal.classList.remove("show");
  document.body.classList.remove("blurred");
};

modal.onclick = e => {
  if(e.target === modal) closeModal.click();
};

currencyBtn.onclick = () => {
  currency = currency === "PEN" ? "USD" : "PEN";
  currencyBtn.textContent = currency === "PEN" ? "USD" : "SOLES";
  render();
};

render();
