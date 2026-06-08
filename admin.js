let data = loadData();

const sectionTitles = {
  "sec-home": ["Inicio", "Administra tu tienda desde un solo panel."],
  "sec-featured": ["Editar oferta destacada", "Personaliza la oferta que se muestra en la página principal."],
  "sec-products": ["Productos", "Agrega, edita y organiza tus plataformas."],
  "sec-categories": ["Categorías", "Crea categorías para dividir tus servicios."],
  "sec-banners": ["Carrusel / Banners", "Edita la información que aparece en el carrusel."],
  "sec-sales": ["Control de ventas", "Registra ventas, costos y ganancias."],
  "sec-settings": ["Configuración", "Edita datos generales, pagos, WhatsApp y contraseña."]
};

loginBtn.onclick = () => {
  if (pass.value === data.password) {
    login.classList.add("hidden");
    panel.classList.remove("hidden");
    loadPanel();
  } else {
    alert("Contraseña incorrecta");
  }
};

document.querySelectorAll(".nav-item").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".admin-section").forEach(s => s.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.section).classList.add("active");
    const [title, subtitle] = sectionTitles[btn.dataset.section] || ["Panel", ""];
    sectionTitle.textContent = title;
    sectionSubtitle.textContent = subtitle;
  };
});

function catName(id){
  return (data.categories.find(c => c.id === id) || {name:"Sin categoría"}).name;
}

function safeSave(msg="Guardado ✅"){
  try{
    saveData(data);
    alert(msg);
    renderHomeKpis();
  }catch(e){
    console.error(e);
    alert("No se pudo guardar. Si subiste imágenes pesadas antes, ejecuta localStorage.clear() en consola y vuelve a configurar.");
  }
}

function ensureFeatured(){
  data.store ||= {};
  data.store.featuredOffer ||= {
    badge:"🔥 Oferta destacada",
    title:"Netflix Premium disponible",
    text:"Consulta stock, vigencia y entrega inmediata por WhatsApp.",
    image:"imagenes/netflix.png",
    buttonText:"📲 Consultar oferta",
    whatsappText:"Hola, quiero consultar la oferta destacada"
  };
}

function loadPanel(){
  ensureFeatured();

  sTitle.value = data.store.title || "";
  sSubtitle.value = data.store.subtitle || "";
  sDescription.value = data.store.description || "";
  sWhatsapp.value = data.store.whatsapp || "";
  sYape.value = data.store.yape || data.store.whatsapp || "";
  sPlin.value = data.store.plin || data.store.whatsapp || "";
  sClientsCount.value = data.store.clientsCount || 250;
  sExchange.value = data.store.exchangeRate || 3.75;
  sMsg.value = data.store.whatsappMessage || "";
  sTerms.value = data.store.terms || "";
  saleDate.value = new Date().toISOString().slice(0,10);

  loadFeaturedInputs();
  renderFeaturedPreview();
  renderCategories();
  renderBanners();
  renderProducts();
  renderSaleProductOptions();
  renderSales();
  renderHomeKpis();
}

function loadFeaturedInputs(){
  ensureFeatured();
  const f = data.store.featuredOffer || {};
  fBadge.value = f.badge || "🔥 Oferta destacada";
  fTitle.value = f.title || "";
  fText.value = f.text || "";
  fImage.value = f.image || "";
  fButtonText.value = f.buttonText || "📲 Consultar oferta";
  fWhatsappText.value = f.whatsappText || "";
}

function renderFeaturedPreview(){
  const f = {
    badge: fBadge.value || "🔥 Oferta destacada",
    title: fTitle.value || "Oferta destacada",
    text: fText.value || "",
    image: fImage.value || "",
    buttonText: fButtonText.value || "📲 Consultar oferta"
  };

  if (typeof previewBadge !== "undefined") previewBadge.textContent = f.badge;
  if (typeof previewTitle !== "undefined") previewTitle.textContent = f.title;
  if (typeof previewText !== "undefined") previewText.textContent = f.text;
  if (typeof previewButton !== "undefined") previewButton.textContent = f.buttonText;

  if (typeof previewImage !== "undefined") {
    previewImage.src = f.image;
    previewImage.style.display = f.image ? "block" : "none";
  }

  if (typeof featuredAdminImage !== "undefined") {
    featuredAdminImage.src = f.image;
    featuredAdminImage.style.display = f.image ? "block" : "none";
  }
}

[fBadge, fTitle, fText, fImage, fButtonText, fWhatsappText].forEach(el => {
  el.addEventListener("input", renderFeaturedPreview);
});

saveFeatured.onclick = () => {
  ensureFeatured();
  data.store.featuredOffer = {
    badge: fBadge.value || "🔥 Oferta destacada",
    title: fTitle.value || "Oferta destacada",
    text: fText.value || "",
    image: fImage.value || "",
    buttonText: fButtonText.value || "📲 Consultar oferta",
    whatsappText: fWhatsappText.value || "Hola, quiero consultar la oferta destacada"
  };

  saveData(data);
  renderFeaturedPreview();
  alert("Oferta destacada guardada ✅");
};

saveStore.onclick = () => {
  data.store.title = sTitle.value;
  data.store.subtitle = sSubtitle.value;
  data.store.description = sDescription.value;
  data.store.whatsapp = sWhatsapp.value.replace(/\D/g,"");
  data.store.yape = sYape.value.replace(/\D/g,"");
  data.store.plin = sPlin.value.replace(/\D/g,"");
  data.store.clientsCount = Number(sClientsCount.value) || 250;
  data.store.exchangeRate = Number(sExchange.value) || 3.75;
  data.store.whatsappMessage = sMsg.value;
  data.store.terms = sTerms.value;
  if (newPass.value.trim()) data.password = newPass.value.trim();
  safeSave("Configuración guardada ✅");
};

addCategory.onclick = () => {
  data.categories.push({id:uid(), name:"Nueva categoría"});
  renderCategories();
  renderProducts();
};
saveCategories.onclick = () => safeSave("Categorías guardadas ✅");

function renderCategories(){
  categoryEditor.innerHTML = "";
  data.categories.forEach((c,i) => {
    const div = document.createElement("div");
    div.className = "edit-banner";
    div.innerHTML = `<label>Nombre</label><input value="${c.name}" data-c="${i}"><button class="admin-danger" data-delcat="${i}">Eliminar</button>`;
    categoryEditor.appendChild(div);
  });
  document.querySelectorAll("[data-c]").forEach(el => {
    el.oninput = () => { data.categories[el.dataset.c].name = el.value; };
  });
  document.querySelectorAll("[data-delcat]").forEach(btn => {
    btn.onclick = () => {
      const removed = data.categories[btn.dataset.delcat];
      if(!confirm("¿Eliminar categoría? Los productos quedarán sin categoría.")) return;
      data.categories.splice(btn.dataset.delcat,1);
      data.products.forEach(p => { if(p.category === removed.id) p.category = ""; });
      renderCategories();
      renderProducts();
    };
  });
}

addBanner.onclick = () => {
  data.banners.push({title:"Nuevo banner", text:"Texto de promoción", active:true});
  renderBanners();
};
saveBanners.onclick = () => safeSave("Carrusel guardado ✅");

function renderBanners(){
  bannerEditor.innerHTML = "";
  data.banners.forEach((b,i) => {
    const div = document.createElement("div");
    div.className = "edit-banner";
    div.innerHTML = `<label>Título</label><input value="${b.title}" data-b="${i}" data-f="title">
    <label>Texto</label><input value="${b.text}" data-b="${i}" data-f="text">
    <label><input type="checkbox" ${b.active ? "checked" : ""} data-b="${i}" data-f="active"> Mostrar banner</label>
    <button class="admin-danger" data-delete-banner="${i}">Eliminar</button>`;
    bannerEditor.appendChild(div);
  });
  document.querySelectorAll("[data-b]").forEach(el => {
    el.oninput = el.onchange = () => {
      data.banners[el.dataset.b][el.dataset.f] = el.dataset.f === "active" ? el.checked : el.value;
    };
  });
  document.querySelectorAll("[data-delete-banner]").forEach(btn => {
    btn.onclick = () => {
      data.banners.splice(btn.dataset.deleteBanner,1);
      renderBanners();
    };
  });
}

addProduct.onclick = () => {
  data.products.push({
    name:"Nuevo servicio",
    category:data.categories[0]?.id || "",
    desc:"Descripción",
    price:"0",
    cost:"0",
    image:"",
    logo:"LOGO",
    color:"#9b5cff",
    offer:false,
    bestSeller:false,
    active:true
  });
  renderProducts();
  renderSaleProductOptions();
};
saveProducts.onclick = () => {
  safeSave("Plataformas guardadas ✅");
  renderSaleProductOptions();
};

function categoryOptions(selected){
  return data.categories.map(c => `<option value="${c.id}" ${selected===c.id?"selected":""}>${c.name}</option>`).join("") +
  `<option value="" ${!selected?"selected":""}>Sin categoría</option>`;
}

function renderProducts(){
  products.innerHTML = "";
  data.products.forEach((p,i) => {
    p.active = p.active !== false;
    p.offer = !!p.offer;
    p.bestSeller = !!p.bestSeller;
    p.image ||= "";
    p.logo ||= p.name || "LOGO";
    p.desc ||= "";
    const preview = p.image ? `<img src="${p.image}" onerror="this.style.display='none'">` : "Sin imagen";
    const div = document.createElement("div");
    div.className = "edit-product";
    div.innerHTML = `<div class="upload">${preview}</div><div>
      <label>Nombre</label><input value="${p.name}" data-i="${i}" data-f="name">
      <label>Categoría</label><select data-i="${i}" data-f="category">${categoryOptions(p.category)}</select>
      <label>Ruta de imagen</label><input value="${p.image || ""}" data-i="${i}" data-f="image" placeholder="imagenes/netflix.png">
      <label>Texto del logo</label><input value="${p.logo || p.name}" data-i="${i}" data-f="logo">
      <label>Color del logo</label><input type="color" value="${p.color || "#9b5cff"}" data-i="${i}" data-f="color">
      <label>Descripción</label><textarea data-i="${i}" data-f="desc">${p.desc || ""}</textarea>
      <div class="grid-2">
        <div><label>Precio venta</label><input value="${p.price}" data-i="${i}" data-f="price"></div>
        <div><label>Costo proveedor</label><input value="${p.cost || 0}" data-i="${i}" data-f="cost"></div>
      </div>
      <label><input type="checkbox" ${p.offer ? "checked" : ""} data-i="${i}" data-f="offer"> Marcar como oferta</label>
      <label><input type="checkbox" ${p.bestSeller ? "checked" : ""} data-i="${i}" data-f="bestSeller"> 🔥 Más vendido</label>
      <label><input type="checkbox" ${p.active ? "checked" : ""} data-i="${i}" data-f="active"> Mostrar en tienda</label>
      <button class="admin-danger" data-delete="${i}">Eliminar</button>
    </div>`;
    products.appendChild(div);
  });
  document.querySelectorAll("[data-i]").forEach(el => {
    el.oninput = el.onchange = () => {
      const f = el.dataset.f;
      data.products[el.dataset.i][f] = (f==="active" || f==="offer" || f==="bestSeller") ? el.checked : el.value;
    };
  });
  document.querySelectorAll("[data-delete]").forEach(btn => {
    btn.onclick = () => {
      data.products.splice(btn.dataset.delete,1);
      renderProducts();
      renderSaleProductOptions();
    };
  });
}

function renderSaleProductOptions(){
  saleProduct.innerHTML = data.products.map((p,i) => `<option value="${i}">${p.name}</option>`).join("");
  fillSalePrice();
}
saleProduct.onchange = fillSalePrice;

function fillSalePrice(){
  const p = data.products[saleProduct.value];
  if(!p) return;
  saleCost.value = soles(p.cost || 0);
  salePrice.value = soles(p.price || 0);
}

addSale.onclick = () => {
  const p = data.products[saleProduct.value];
  if(!p) return alert("Selecciona un producto");
  data.sales.push({
    id:uid(),
    date:saleDate.value || new Date().toISOString().slice(0,10),
    client:saleClient.value || "Cliente",
    product:p.name,
    category:p.category,
    cost:soles(saleCost.value),
    price:soles(salePrice.value),
    payment:salePayment.value,
    status:saleStatus.value
  });
  saleClient.value = "";
  safeSave("Venta registrada ✅");
  renderSales();
};

function renderSales(){
  const totalIncome = data.sales.reduce((s,v) => s + soles(v.price),0);
  const totalCost = data.sales.reduce((s,v) => s + soles(v.cost),0);
  kpiSales.textContent = data.sales.length;
  kpiIncome.textContent = money(totalIncome);
  kpiCost.textContent = money(totalCost);
  kpiProfit.textContent = money(totalIncome-totalCost);
  salesTable.innerHTML = "";
  [...data.sales].reverse().forEach(v => {
    salesTable.innerHTML += `<tr><td>${v.date}</td><td>${v.client}</td><td>${catName(v.category)}</td><td>${v.product}</td><td>${money(v.cost)}</td><td>${money(v.price)}</td><td>${money(v.price-v.cost)}</td><td>${v.payment}</td><td>${v.status}</td><td><button class="mini-danger" data-delsale="${v.id}">X</button></td></tr>`;
  });
  document.querySelectorAll("[data-delsale]").forEach(btn => {
    btn.onclick = () => {
      data.sales = data.sales.filter(v => v.id !== btn.dataset.delsale);
      safeSave("Venta eliminada ✅");
      renderSales();
    };
  });
  renderHomeKpis();
}

function renderHomeKpis(){
  const totalIncome = data.sales.reduce((s,v) => s + soles(v.price),0);
  const totalCost = data.sales.reduce((s,v) => s + soles(v.cost),0);
  if (typeof kpiSalesHome !== "undefined") kpiSalesHome.textContent = data.sales.length;
  if (typeof kpiIncomeHome !== "undefined") kpiIncomeHome.textContent = money(totalIncome);
  if (typeof kpiProfitHome !== "undefined") kpiProfitHome.textContent = money(totalIncome-totalCost);
  if (typeof kpiClientsHome !== "undefined") kpiClientsHome.textContent = "+" + (data.store.clientsCount || 250);
}

exportSales.onclick = () => {
  const rows = [["Fecha","Cliente","Categoria","Producto","Costo","Venta","Ganancia","Pago","Estado"], ...data.sales.map(v => [v.date,v.client,catName(v.category),v.product,v.cost,v.price,(v.price-v.cost).toFixed(2),v.payment,v.status])];
  const csv = rows.map(r => r.map(c => `"${String(c).replaceAll('"','""')}"`).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv],{type:"text/csv"}));
  a.download = "ventas_lalastreaming.csv";
  a.click();
};
