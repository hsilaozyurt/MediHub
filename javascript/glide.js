// DOM yüklendiğinde Glide.js'i başlat
document.addEventListener("DOMContentLoaded", () => {
    // Glide.js ana ürün kaydırıcısı
    const productCarousel = document.querySelector(".product-carousel");
  
    if (productCarousel) {
      new Glide(".product-carousel", {
        type: "carousel", // Kaydırıcı tipi
        perView: 4,       // Aynı anda gösterilecek ürün sayısı
        gap: 20,          // Ürünler arasındaki boşluk
        breakpoints: {    // Ekran genişliklerine göre yapılandırma
          1200: { perView: 3 },
          992: { perView: 2 },
          768: { perView: 1 },
        },
      }).mount();
    }
  
    // Thumbnail (küçük resim) kaydırıcı
    const productThumb = document.querySelector(".product-thumb");
  
    if (productThumb) {
      new Glide(".product-thumb", {
        type: "carousel",
        perView: 5,
        gap: 10,
        breakpoints: {
          992: { perView: 3 },
          768: { perView: 2 },
        },
      }).mount();
    }
  
    // Ürün sayısını dinamik olarak kontrol et
    const productItems = document.querySelectorAll(".product-item");
    console.log(`Toplam Ürün Sayısı: ${productItems.length}`);
  });
  
