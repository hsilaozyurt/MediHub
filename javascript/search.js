function productRoute() {
  const resultItemDOM = document.querySelectorAll(
      ".search-results .result-item"
  );
  resultItemDOM.forEach((item) => {
      item.addEventListener("click", (e) => {
          const id = item.dataset.id;
          if (id) {
              localStorage.setItem("productId", JSON.stringify(id));
              window.location.href = "single-product.html";
          }
      });
  });
}

function searchFunc(products) {
  const searchWrapperDOM = document.querySelector(".search-results .results");
  const searchInputDOM = document.querySelector(".search-form input");

  if (!searchWrapperDOM || !searchInputDOM) {
      console.error("HTML elementleri bulunamadı.");
      return;
  }

  let value = "";
  let filtered = [];

  function renderResults(items) {
      let result = "";

      if (items.length > 0) {
          searchWrapperDOM.style.gridTemplateColumns = items.length > 1 ? "1fr 1fr" : "1fr";
          items.forEach((item) => {
              result += `
                  <a href="#" class="result-item" data-id=${item.id}>
                      <img src="${item.img.singleImage}" class="search-thumb" alt="${item.name}">
                      <div class="search-info">
                          <h4>${item.name}</h4>
                          <span class="search-sku">SKU: ${item.sku || 'PD0016'}</span>
                          <span class="search-price">${item.price.newPrice.toFixed(2)}₺</span>
                      </div>
                  </a>
              `;
          });
      } else {
          result = `
              <a href="#" class="result-item" style="justify-content: center">
                  😔Aradığınız Ürün Bulunamadı😔
              </a>
          `;
      }

      searchWrapperDOM.innerHTML = result;
      productRoute();
  }

  renderResults(products);

  searchInputDOM.addEventListener("input", (e) => {
      value = e.target.value.trim().toLowerCase();
      filtered = products.filter((item) =>
          item.name.toLowerCase().includes(value)
      );
      renderResults(filtered);
  });
}

export default searchFunc;
