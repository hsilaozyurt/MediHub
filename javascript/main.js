import headerFunc from "./header.js";
import productsFunc from "./product.js";
import searchFunc from "./search.js";

(async function () {
  try {
    // JSON Dosyasını Yükle ve localStorage'a Kaydet
    const response = await fetch("./javascript/data.json");
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = await response.json();
    localStorage.setItem("products", JSON.stringify(data));
    console.log("Products Data Loaded:", data);

    // Ürün Bağlantılarına Event Listener Ekle
    const productLinks = document.querySelectorAll(".product-item a");
    if (productLinks.length > 0) {
      productLinks.forEach((link) => {
        link.addEventListener("click", function () {
          const id = this.closest(".product-item").dataset.id;
          localStorage.setItem("productId", JSON.stringify(id));
          console.log("Product ID Set:", id);
        });
      });
    } else {
      console.warn("No product links found on the page.");
    }

    // Ürün Sayfasında Verileri Yükle
    const productId = localStorage.getItem("productId")
      ? JSON.parse(localStorage.getItem("productId"))
      : null;

    if (!productId) {
      console.error("Product ID not found!");
      alert("Ürün ID bulunamadı. Ana sayfaya yönlendiriliyorsunuz.");
      window.location.href = "index.html";
      return;
    }

    const products = JSON.parse(localStorage.getItem("products")) || [];
    const findProduct = products.find((item) => item.id === Number(productId));

    if (!findProduct) {
      console.error("Product not found for ID:", productId);
      alert("Ürün bulunamadı. Hata sayfasına yönlendiriliyorsunuz.");
      window.location.href = "404.html";
      return;
    }

    console.log("Find Product:", findProduct);

    // DOM Manipülasyonları
    const productTitleDOM = document.querySelector(".product-title");
    const singleImageDOM = document.querySelector("#single-image");
    const galleryThumbs = document.querySelector(".gallery-thumbs");

    if (productTitleDOM) {
      productTitleDOM.innerHTML = findProduct.name || "Ürün Adı Bulunamadı";
    } else {
      console.error("Product title DOM element not found.");
    }

    if (singleImageDOM) {
      singleImageDOM.src = findProduct.img.singleImage || "default.jpg";
    } else {
      console.error("Single image DOM element not found.");
    }

    if (galleryThumbs) {
      galleryThumbs.innerHTML = ""; // Eski içerikleri temizle

      if (findProduct.img && findProduct.img.thumbs && findProduct.img.thumbs.length > 0) {
        findProduct.img.thumbs.forEach((item, index) => {
          galleryThumbs.innerHTML += `
            <li class="gallery-thumb-item" data-index="${index}">
              <img src="${item}" alt="Product Thumbnail" class="img-fluid">
            </li>
          `;
        });
      } else {
        console.warn("No thumbnails found for this product.");
        galleryThumbs.innerHTML = `<li>Görsel Bulunamadı</li>`;
      }
    } else {
      console.error("Gallery thumbs DOM element not found.");
    }
  } catch (error) {
    console.error("Error in main.js:", error.message);
  }
})();
