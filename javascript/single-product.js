//! Import Functions
import { thumbsActiveFunc } from "./single-product/thumbsActive.js";
import zoomFunc from "./single-product/zoom.js";
import colorsFunc from "./single-product/colors.js";
import valuesFunc from "./single-product/values.js";
import tabsFunc from "./single-product/tabs.js";
import commentsFunc from "./single-product/comment.js";

//! Product ID
const productId = localStorage.getItem("productId")
  ? JSON.parse(localStorage.getItem("productId"))
  : null;

if (!productId) {
  console.error("Product ID not found!");
  alert("Ürün ID bulunamadı. Ana sayfaya yönlendiriliyorsunuz.");
  window.location.href = "index.html";
}

//! Products Data
const products = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : [];

if (!products || products.length === 0) {
  console.error("Products list is empty or not found!");
  alert("Ürün bilgileri yüklenemedi. Ana sayfaya yönlendiriliyorsunuz.");
  window.location.href = "index.html";
}

const findProduct = products.find((item) => item.id === Number(productId));
if (!findProduct) {
  console.error(`Product not found for productId: ${productId}`);
  alert("Ürün bulunamadı. Ana sayfaya yönlendiriliyorsunuz.");
  window.location.href = "404.html";
}

//! Product Title
const productTitle = document.querySelector(".product-title");
productTitle.innerHTML = findProduct.name || "Ürün Adı Bulunamadı";

//! Product Price
const newPriceDOM = document.querySelector(".new-price");
const oldPriceDOM = document.querySelector(".old-price");

if (findProduct.price) {
  newPriceDOM.innerHTML = `${findProduct.price.newPrice.toFixed(2)}₺`;
  oldPriceDOM.innerHTML = findProduct.price.oldPrice
    ? `${findProduct.price.oldPrice.toFixed(2)}₺`
    : "";
} else {
  console.error("Ürün fiyat bilgisi eksik!");
}

//! Product Gallery
const singleImageDOM = document.querySelector("#single-image");
const galleryThumbs = document.querySelector(".gallery-thumbs");

galleryThumbs.innerHTML = ""; // Clear previous content

if (findProduct.img) {
  singleImageDOM.src = findProduct.img.singleImage || "default.jpg";

  if (findProduct.img.thumbs && findProduct.img.thumbs.length > 0) {
    findProduct.img.thumbs.forEach((item, index) => {
      if (item) { // Check if the thumbnail exists
        galleryThumbs.innerHTML += `
          <li class="gallery-thumb-item" data-index="${index}">
            <img src="${item}" alt="Product Thumbnail" class="img-fluid">
          </li>
        `;
      } else {
        console.warn(`Thumbnail missing for index ${index}`);
      }
    });
  } else {
    galleryThumbs.innerHTML = `<li>Görsel Bulunamadı</li>`;
  }
} else {
  console.error("Ürün görselleri eksik!");
  singleImageDOM.src = "default.jpg";
}

// Thumbnail Active State
const galleryThumbItems = document.querySelectorAll(".gallery-thumb-item img");
galleryThumbItems.forEach((thumb) => {
  thumb.addEventListener("click", function () {
    singleImageDOM.src = thumb.src;
    galleryThumbItems.forEach((item) => item.classList.remove("active"));
    thumb.classList.add("active");
  });
});
galleryThumbItems[0]?.classList.add("active");

//! Add to Cart
let cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const btnAddToCart = document.getElementById("add-to-cart");
const quantityDOM = document.getElementById("quantity");
const cartItems = document.querySelector(".header-cart-count");

btnAddToCart.addEventListener("click", function () {
  const existingProduct = cart.find((item) => item.id === findProduct.id);

  if (existingProduct) {
    alert("Ürün zaten sepette.");
  } else {
    cart.push({ ...findProduct, quantity: Number(quantityDOM.value) });
    localStorage.setItem("cart", JSON.stringify(cart));
    cartItems.innerHTML = cart.length;
    alert("Ürün sepete eklendi.");
  }
});

//! Debugging Logs
console.log("Product:", findProduct);
console.log("Cart:", cart);
console.log("Products List:", products);
