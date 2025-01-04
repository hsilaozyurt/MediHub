let cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

// Sepet ürünlerini görüntüleme fonksiyonu
function displayCartProduct() {
  const cartWrapper = document.querySelector(".cart-wrapper");
  let result = "";
  cart.forEach((item) => {
    result += `
   <tr class="cart-item">
    <td></td>
    <td class="cart-image">
        <img src="${item.img.singleImage}" alt="">
        <i class="bi bi-x delete-cart" data-id="${item.id}"></i>
    </td>
    <td>${item.name}</td>
    <td>${item.price.newPrice.toFixed(2)}₺</td>
    <td class="product-quantity">${item.quantity}</td>
    <td class="product-subtotal">${(
      item.price.newPrice * item.quantity
    ).toFixed(2)}₺</td>
   </tr>
   `;
  });
  cartWrapper.innerHTML = result;
  removeCartItem();
}

// Sepet ürünlerini görüntüleme
displayCartProduct();

// Sepetten ürün silme fonksiyonu
function removeCartItem() {
  const btnDeleteCart = document.querySelectorAll(".delete-cart");
  let cartItems = document.querySelector(".header-cart-count");

  btnDeleteCart.forEach((button) => {
    button.addEventListener("click", function (e) {
      const id = e.target.dataset.id;
      cart = cart.filter((item) => item.id !== Number(id));
      displayCartProduct();
      localStorage.setItem("cart", JSON.stringify(cart));
      cartItems.innerHTML = cart.length;
      saveCartValues();
    });
  });
}

// Sepet toplamlarını hesaplama fonksiyonu
function saveCartValues() {
  const cartTotal = document.getElementById("cart-total");
  const subtotal = document.getElementById("subtotal");
  const fastCargo = document.getElementById("fast-cargo");
  const fastCargoPrice = 1000; // Hızlı kargo fiyatı (TL)
  let itemsTotal = 0;

  // Toplam ürün fiyatlarını hesapla
  cart.forEach((item) => (itemsTotal += item.price.newPrice * item.quantity));
  console.log("Toplam Ürün Fiyatı:", itemsTotal);

  subtotal.innerHTML = `${itemsTotal.toFixed(2)}₺`;
  cartTotal.innerHTML = `${itemsTotal.toFixed(2)}₺`;

  // Hızlı kargo seçeneği
  fastCargo.addEventListener("change", function (e) {
    if (e.target.checked) {
      cartTotal.innerHTML = `${(itemsTotal + fastCargoPrice).toFixed(2)}₺`;
    } else {
      cartTotal.innerHTML = `${itemsTotal.toFixed(2)}₺`;
    }
  });
}

// Sepet toplamlarını hesapla ve güncelle
saveCartValues();
