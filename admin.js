let data = loadData();

loginBtn.onclick = () => {
  if(pass.value === data.password){
    login.classList.add("hidden");
    panel.classList.remove("hidden");
    loadPanel();
  }else{
    alert("Contraseña incorrecta");
  }
};

function loadPanel(){
  sTitle.value = data.store.title;
  sSubtitle.value = data.store.subtitle;
  sDescription.value = data.store.description;
  sWhatsapp.value = data.store.whatsapp;
  sExchange.value = data.store.exchangeRate;
  sMsg.value = data.store.whatsappMessage;
  sTerms.value = data.store.terms;
  renderProducts();
}

saveStore.onclick = () => {
  data.store.title = sTitle.value;
  data.store.subtitle = sSubtitle.value;
  data.store.description = sDescription.value;
  data.store.whatsapp = sWhatsapp.value.replace(/\D/g, "");
  data.store.exchangeRate = Number(sExchange.value) || 3.75;
  data.store.whatsappMessage = sMsg.value;
  data.store.terms = sTerms.value;
  if(newPass.value.trim()) data.password = newPass.value.trim();
  saveData(data);
  alert("Guardado ✅");
};

addProduct.onclick = () => {
  data.products.push({name:"Nuevo servicio", desc:"Descripción", price:"0", image:"", active:true});
  renderProducts();
};

saveProducts.onclick = () => {
  saveData(data);
  alert("Plataformas guardadas ✅");
};

function renderProducts(){
  products.innerHTML = "";
  data.products.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "edit-product";
    div.innerHTML = `
      <div class="upload">${p.image ? `<img src="${p.image}">` : "Subir imagen"}<input type="file" accept="image/*"></div>
      <div>
        <label>Nombre</label><input value="${p.name}" data-i="${i}" data-f="name">
        <label>Descripción</label><textarea data-i="${i}" data-f="desc">${p.desc}</textarea>
        <label>Precio en soles</label><input value="${p.price}" data-i="${i}" data-f="price">
        <label><input type="checkbox" ${p.active ? "checked" : ""} data-i="${i}" data-f="active"> Mostrar en tienda</label>
        <button class="danger" data-delete="${i}">Eliminar</button>
      </div>`;
    products.appendChild(div);
  });

  document.querySelectorAll("[data-f]").forEach(el => {
    el.oninput = el.onchange = () => {
      const i = el.dataset.i, f = el.dataset.f;
      data.products[i][f] = f === "active" ? el.checked : el.value;
    };
  });

  document.querySelectorAll("[data-delete]").forEach(btn => {
    btn.onclick = () => {
      data.products.splice(btn.dataset.delete, 1);
      renderProducts();
    };
  });

  document.querySelectorAll(".upload").forEach((box, i) => {
    const input = box.querySelector("input");
    box.onclick = () => input.click();
    input.onchange = () => {
      const file = input.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = e => {
        data.products[i].image = e.target.result;
        renderProducts();
      };
      reader.readAsDataURL(file);
    };
  });
}
