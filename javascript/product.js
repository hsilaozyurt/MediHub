let cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

// Sepet sayısını güncelleme fonksiyonu
function updateCartCount() {
  const cartItems = document.querySelector(".header-cart-count");
  if (cartItems) {
    cartItems.innerHTML = cart.length;
  }
}

// Sepete ürün ekleme fonksiyonu
function addToCart(products) {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach((button) => {
    const productId = Number(button.dataset.id);
    const inCart = cart.find((item) => item.id === productId);

    if (inCart) {
      button.setAttribute("disabled", "disabled");
    } else {
      button.addEventListener("click", function () {
        const findProduct = products.find((product) => product.id === productId);

        if (findProduct) {
          cart.push({ ...findProduct, quantity: 1 });
          localStorage.setItem("cart", JSON.stringify(cart));
          button.setAttribute("disabled", "disabled");
          updateCartCount();
        }
      });
    }
  });
}

// Ürünleri dinamik olarak sayfaya yükleme fonksiyonu
function productsFunc(products) {
  const productsContainer = document.querySelector(".product-grid");

  if (productsContainer) {
    productsContainer.innerHTML = "";

    products.forEach((product) => {
      const productHTML = `
        <div class="product-item" data-id="${product.id}">
          <div class="product-image">
            <a href="single-product.html">
              <img src="${product.img.singleImage || './img/default-image.jpg'}" 
                   alt="${product.name}" class="img1">
              <img src="${product.img.thumbs?.[1] || './img/default-image.jpg'}" 
                   alt="${product.name}" class="img2">
            </a>
          </div>
          <div class="product-info">
            <a href="single-product.html" class="product-title">${product.name}</a>
            <ul class="product-star">
              <li><i class="bi bi-star-fill"></i></li>
              <li><i class="bi bi-star-fill"></i></li>
              <li><i class="bi bi-star-fill"></i></li>
              <li><i class="bi bi-star-fill"></i></li>
              <li><i class="bi bi-star-half"></i></li>
            </ul>
            <div class="product-prices">
              <strong class="new-price">${product.price.newPrice}₺</strong>
              <span class="old-price">${product.price.oldPrice || ''}₺</span>
            </div>
            <span class="product-discount">-${product.discount || 0}%</span>
            <div class="product-links">
              <button class="add-to-cart" data-id="${product.id}">
                <i class="bi bi-basket-fill"></i>
              </button>
              <button><i class="bi bi-heart-fill"></i></button>
              <a href="single-product.html"><i class="bi bi-eye-fill"></i></a>
              <a href="#"><i class="bi bi-share-fill"></i></a>
            </div>
          </div>
        </div>`;
      productsContainer.insertAdjacentHTML("beforeend", productHTML);
    });

    addToCart(products);
  }
}

updateCartCount();

export default productsFunc;
