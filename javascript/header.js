function sidebarFunc() {
    //! home sidebar start
    const btnOpenSidebar = document.querySelector("#btn-menu");
    const sidebar = document.querySelector("#sidebar");
    const btnCloseSidebar = document.querySelector("#close-sidebar");
  
    if (btnOpenSidebar && sidebar && btnCloseSidebar) {
      btnOpenSidebar.addEventListener("click", function () {
        sidebar.style.left = "0";
      });
  
      btnCloseSidebar.addEventListener("click", function () {
        sidebar.style.left = "-100%";
      });
  
      /* click outside start */
      document.addEventListener("click", function (event) {
        if (
          !event.composedPath().includes(sidebar) &&
          !event.composedPath().includes(btnOpenSidebar)
        ) {
          sidebar.style.left = "-100%";
        }
      });
      /* click outside end */
    }
  }
  
  function searchModalFunc() {
    //! search modal start
    const btnOpenSearch = document.querySelector(".search-button");
    const btnCloseSearch = document.getElementById("close-search");
    const modalSearch = document.querySelector(".modal-search");
    const modalSearchWrapper = document.querySelector(".modal-wrapper");
  
    if (btnOpenSearch && btnCloseSearch && modalSearch && modalSearchWrapper) {
      btnOpenSearch.addEventListener("click", function () {
        modalSearch.style.visibility = "visible";
        modalSearch.style.opacity = "1";
      });
  
      btnCloseSearch.addEventListener("click", function () {
        modalSearch.style.visibility = "hidden";
        modalSearch.style.opacity = "0";
      });
  
      /* click outside start */
      document.addEventListener("click", function (e) {
        if (
          !e.composedPath().includes(modalSearchWrapper) &&
          !e.composedPath().includes(btnOpenSearch)
        ) {
          modalSearch.style.visibility = "hidden";
          modalSearch.style.opacity = "0";
        }
      });
      /* click outside end */
    }
  }
  
  function headerFunc() {
    document.addEventListener("DOMContentLoaded", function () {
      sidebarFunc();
      searchModalFunc();
    });
  }
  
  export default headerFunc;
