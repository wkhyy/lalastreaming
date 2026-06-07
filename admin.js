let data = loadData();

loginBtn.onclick = () => {
  if (pass.value === data.password) {
    login.classList.add("hidden");
    panel.classList.remove("hidden");
    loadPanel();
  } else alert("Contraseña incorrecta");
};

function catName(id) {
  return (data.categories.find((c) => c.id === id) || { name: "Sin categoría" })
    .name;
}
function slug(text) {
  return (
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || uid()
  );
}

function loadPanel() {
  sTitle.value = data.store.title;
  sSubtitle.value = data.store.subtitle;
  sDescription.value = data.store.description;
  sWhatsapp.value = data.store.whatsapp;
  sYape.value = data.store.yape || data.store.whatsapp;
  sPlin.value = data.store.plin || data.store.whatsapp;
  sClientsCount.value = data.store.clientsCount || 250;
  sExchange.value = data.store.exchangeRate;
  sMsg.value = data.store.whatsappMessage;
  sTerms.value = data.store.terms;
  saleDate.value = new Date().toISOString().slice(0, 10);
  renderCategories();
  renderBanners();
  renderProducts();
  renderSaleProductOptions();
  renderSales();
}
function safeSave(msg = "Guardado ✅") {
  try {
    saveData(data);
    alert(msg);
  } catch (e) {
    console.error(e);
    alert(
      "No se pudo guardar. Ejecuta localStorage.clear() en consola, recarga y vuelve a configurar.",
    );
  }
}
saveStore.onclick = () => {
  data.store.title = sTitle.value;
  data.store.subtitle = sSubtitle.value;
  data.store.description = sDescription.value;
  data.store.whatsapp = sWhatsapp.value.replace(/\D/g, "");
  data.store.yape = sYape.value.replace(/\D/g, "");
  data.store.plin = sPlin.value.replace(/\D/g, "");
  data.store.clientsCount = Number(sClientsCount.value) || 250;
  data.store.exchangeRate = Number(sExchange.value) || 3.75;
  data.store.whatsappMessage = sMsg.value;
  data.store.terms = sTerms.value;
  if (newPass.value.trim()) data.password = newPass.value.trim();
  safeSave();
};

addCategory.onclick = () => {
  data.categories.push({ id: uid(), name: "Nueva categoría" });
  renderCategories();
  renderProducts();
};
saveCategories.onclick = () => {
  safeSave("Categorías guardadas ✅");
};
function renderCategories() {
  categoryEditor.innerHTML = "";
  data.categories.forEach((c, i) => {
    const div = document.createElement("div");
    div.className = "edit-banner";
    div.innerHTML = `<label>Nombre</label><input value="${c.name}" data-c="${i}"><button class="danger" data-delcat="${i}">Eliminar</button>`;
    categoryEditor.appendChild(div);
  });
  document.querySelectorAll("[data-c]").forEach(
    (el) =>
      (el.oninput = () => {
        data.categories[el.dataset.c].name = el.value;
      }),
  );
  document.querySelectorAll("[data-delcat]").forEach(
    (btn) =>
      (btn.onclick = () => {
        const removed = data.categories[btn.dataset.delcat];
        if (
          !confirm("¿Eliminar categoría? Los productos quedarán sin categoría.")
        )
          return;
        data.categories.splice(btn.dataset.delcat, 1);
        data.products.forEach((p) => {
          if (p.category === removed.id) p.category = "";
        });
        renderCategories();
        renderProducts();
      }),
  );
}

addBanner.onclick = () => {
  data.banners.push({
    title: "Nuevo banner",
    text: "Texto de promoción",
    active: true,
  });
  renderBanners();
};
saveBanners.onclick = () => {
  safeSave("Banners guardados ✅");
};
function renderBanners() {
  bannerEditor.innerHTML = "";
  data.banners.forEach((b, i) => {
    const div = document.createElement("div");
    div.className = "edit-banner";
    div.innerHTML = `<label>Título</label><input value="${b.title}" data-b="${i}" data-f="title"><label>Texto</label><input value="${b.text}" data-b="${i}" data-f="text"><label><input type="checkbox" ${b.active ? "checked" : ""} data-b="${i}" data-f="active"> Mostrar banner</label><button class="danger" data-delete-banner="${i}">Eliminar</button>`;
    bannerEditor.appendChild(div);
  });
  document.querySelectorAll("[data-b]").forEach((el) => {
    el.oninput = el.onchange = () => {
      data.banners[el.dataset.b][el.dataset.f] =
        el.dataset.f === "active" ? el.checked : el.value;
    };
  });
  document.querySelectorAll("[data-delete-banner]").forEach(
    (btn) =>
      (btn.onclick = () => {
        data.banners.splice(btn.dataset.deleteBanner, 1);
        renderBanners();
      }),
  );
}

addProduct.onclick = () => {
  data.products.push({
    name: "Nuevo servicio",
    category: data.categories[0]?.id || "",
    desc: "Descripción",
    price: "0",
    cost: "0",
    image: "",
    logo: "LOGO",
    color: "#9b5cff",
    offer: false,
    active: true,
    bestSeller: false,
  });
  renderProducts();
  renderSaleProductOptions();
};
saveProducts.onclick = () => {
  safeSave("Plataformas guardadas ✅");
  renderSaleProductOptions();
};
function categoryOptions(selected) {
  return (
    data.categories
      .map(
        (c) =>
          `<option value="${c.id}" ${selected === c.id ? "selected" : ""}>${c.name}</option>`,
      )
      .join("") +
    `<option value="" ${!selected ? "selected" : ""}>Sin categoría</option>`
  );
}
function renderProducts() {
  products.innerHTML = "";
  data.products.forEach((p, i) => {
    const preview = p.image
      ? `<img src="${p.image}" onerror="this.style.display='none'">`
      : "Sin imagen";
    const div = document.createElement("div");
    div.className = "edit-product";
    div.innerHTML = `<div class="upload no-click">${preview}</div><div>
      <label>Nombre</label><input value="${p.name}" data-i="${i}" data-f="name">
      <label>Categoría</label><select data-i="${i}" data-f="category">${categoryOptions(p.category)}</select>
      <label>Ruta de imagen</label><input value="${p.image || ""}" data-i="${i}" data-f="image" placeholder="imagenes/netflix.png">
      <small>Sube la imagen a GitHub en la carpeta /imagenes y coloca aquí la ruta. Ejemplo: imagenes/netflix.png</small>
      <label>Texto del logo</label><input value="${p.logo || p.name}" data-i="${i}" data-f="logo">
      <label>Color del logo</label><input type="color" value="${p.color || "#9b5cff"}" data-i="${i}" data-f="color">
      <label>Descripción</label><textarea data-i="${i}" data-f="desc">${p.desc}</textarea>
      <label>Precio venta</label><input value="${p.price}" data-i="${i}" data-f="price">
      <label>Costo proveedor</label><input value="${p.cost || 0}" data-i="${i}" data-f="cost">
      <label><input type="checkbox" ${p.offer ? "checked" : ""} data-i="${i}" data-f="offer"> Marcar como oferta</label><label><input type="checkbox" ${p.bestSeller ? "checked" : ""} data-i="${i}" data-f="bestSeller"> 🔥 Más vendido</label>
      <label><input type="checkbox" ${p.active ? "checked" : ""} data-i="${i}" data-f="active"> Mostrar en tienda</label>
      <button class="danger" data-delete="${i}">Eliminar</button>
    </div>`;
    products.appendChild(div);
  });
  document.querySelectorAll("[data-i]").forEach((el) => {
    el.oninput = el.onchange = () => {
      const f = el.dataset.f;
      data.products[el.dataset.i][f] =
        f === "active" || f === "offer" || f === "bestSeller"
          ? el.checked
          : el.value;
    };
  });
  document.querySelectorAll("[data-delete]").forEach(
    (btn) =>
      (btn.onclick = () => {
        data.products.splice(btn.dataset.delete, 1);
        renderProducts();
        renderSaleProductOptions();
      }),
  );
}

function renderSaleProductOptions() {
  saleProduct.innerHTML = data.products
    .map((p, i) => `<option value="${i}">${p.name}</option>`)
    .join("");
  fillSalePrice();
}
saleProduct.onchange = fillSalePrice;
function fillSalePrice() {
  const p = data.products[saleProduct.value];
  if (!p) return;
  saleCost.value = soles(p.cost || 0);
  salePrice.value = soles(p.price || 0);
}
addSale.onclick = () => {
  const p = data.products[saleProduct.value];
  if (!p) return alert("Selecciona un producto");
  data.sales.push({
    id: uid(),
    date: saleDate.value || new Date().toISOString().slice(0, 10),
    client: saleClient.value || "Cliente",
    product: p.name,
    category: p.category,
    cost: soles(saleCost.value),
    price: soles(salePrice.value),
    payment: salePayment.value,
    status: saleStatus.value,
  });
  saleClient.value = "";
  safeSave("Venta registrada ✅");
  renderSales();
};
function renderSales() {
  const totalIncome = data.sales.reduce((s, v) => s + soles(v.price), 0),
    totalCost = data.sales.reduce((s, v) => s + soles(v.cost), 0);
  kpiSales.textContent = data.sales.length;
  kpiIncome.textContent = money(totalIncome);
  kpiCost.textContent = money(totalCost);
  kpiProfit.textContent = money(totalIncome - totalCost);
  salesTable.innerHTML = "";
  [...data.sales].reverse().forEach((v) => {
    salesTable.innerHTML += `<tr><td>${v.date}</td><td>${v.client}</td><td>${catName(v.category)}</td><td>${v.product}</td><td>${money(v.cost)}</td><td>${money(v.price)}</td><td>${money(v.price - v.cost)}</td><td>${v.payment}</td><td>${v.status}</td><td><button class="mini-danger" data-delsale="${v.id}">X</button></td></tr>`;
  });
  document.querySelectorAll("[data-delsale]").forEach(
    (btn) =>
      (btn.onclick = () => {
        data.sales = data.sales.filter((v) => v.id !== btn.dataset.delsale);
        safeSave("Venta registrada ✅");
        renderSales();
      }),
  );
}
exportSales.onclick = () => {
  const rows = [
    [
      "Fecha",
      "Cliente",
      "Categoria",
      "Producto",
      "Costo",
      "Venta",
      "Ganancia",
      "Pago",
      "Estado",
    ],
    ...data.sales.map((v) => [
      v.date,
      v.client,
      catName(v.category),
      v.product,
      v.cost,
      v.price,
      (v.price - v.cost).toFixed(2),
      v.payment,
      v.status,
    ]),
  ];
  const csv = rows
    .map((r) => r.map((c) => `"${String(c).replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = "ventas_lalastreaming.csv";
  a.click();
};
