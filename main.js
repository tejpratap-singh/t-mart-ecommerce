import "./style.css";
import products from "./api/products.json";
import { showProductContainer } from "./homeProductCards";
import { getCartProductFromLS } from "./getCartProducts";

// Always initialize cart badge from localStorage on page load
getCartProductFromLS();

// Load all products on homepage or products page if container exists
const productContainer = document.querySelector("#productContainer");
if (productContainer) {
  showProductContainer(products);
}

// ================= Search Function =================
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchInfo = document.getElementById("searchInfo");

if (searchBtn && searchInput) {
  const handleSearch = () => {
    const searchValue = searchInput.value.trim().toLowerCase();

    // If search is empty, restore all products
    if (!searchValue) {
      if (searchInfo) searchInfo.innerHTML = "";
      if (productContainer) showProductContainer(products);
      return;
    }

    const filteredProducts = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchValue) ||
        product.category.toLowerCase().includes(searchValue) ||
        product.brand.toLowerCase().includes(searchValue)
      );
    });

    if (filteredProducts.length === 0) {
      if (searchInfo) {
        searchInfo.innerHTML = "";
      }
      if (productContainer) {
        productContainer.innerHTML = `
          <div style="
            background:#eef5f3;
            border:2px solid #ddb8c8;
            border-radius:18px;
            padding:40px;
            text-align:center;
            max-width:700px;
            margin:40px auto;
            box-shadow:0 10px 25px rgba(128,152,200,0.18);
          ">
            <h2 style="color:#8098c8; font-size:32px; margin-bottom:15px;">
              🔍 No Products Found
            </h2>
            <p style="color:#5b6478; font-size:18px;">
              Try searching for another product.
            </p>
          </div>
        `;
      }
      return;
    }

    if (searchInfo) {
      searchInfo.innerHTML = `
        <div style="
          background:#eef5f3;
          border-left:6px solid #8098c8;
          border-radius:12px;
          padding:18px 25px;
          margin-bottom:25px;
          box-shadow:0 5px 15px rgba(128,152,200,.15);
        ">
          <h2 style="color:#1f2a44; margin:0; font-size:24px;">
            🔍 Search Results
          </h2>
          <p style="margin-top:8px; color:#5b6478; font-size:16px;">
            Showing <strong>${filteredProducts.length}</strong> Product(s) for "<strong>${searchInput.value.trim()}</strong>"
          </p>
        </div>
      `;
    }

    showProductContainer(filteredProducts);
  };

  if (productContainer) {
    searchBtn.addEventListener("click", handleSearch);

    searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSearch();
      }
    });

    searchInput.addEventListener("input", () => {
      if (searchInput.value.trim() === "") {
        if (searchInfo) searchInfo.innerHTML = "";
        showProductContainer(products);
      }
    });

    // Check URL parameters for search query
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get("search");
    if (searchParam) {
      searchInput.value = searchParam;
      handleSearch();
    }
  } else {
    // If on a page without productContainer (e.g. About, Contact, Cart), redirect search to products.html
    const handleRedirectSearch = () => {
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
      } else {
        window.location.href = `products.html`;
      }
    };

    searchBtn.addEventListener("click", handleRedirectSearch);

    searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleRedirectSearch();
      }
    });
  }
}

// ================= Mobile Navigation Toggle =================
const navbarToggle = document.getElementById("navbarToggle");
const navbarMenu = document.querySelector(".navbar");

if (navbarToggle && navbarMenu) {
  navbarToggle.addEventListener("click", () => {
    const isExpanded = navbarToggle.getAttribute("aria-expanded") === "true";
    navbarToggle.setAttribute("aria-expanded", String(!isExpanded));
    navbarMenu.classList.toggle("active");
    const icon = navbarToggle.querySelector("i");
    if (icon) {
      if (navbarMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
      } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (
      navbarMenu.classList.contains("active") &&
      !navbarMenu.contains(event.target) &&
      !navbarToggle.contains(event.target)
    ) {
      navbarMenu.classList.remove("active");
      navbarToggle.setAttribute("aria-expanded", "false");
      const icon = navbarToggle.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    }
  });

  // Close mobile menu when a nav link is clicked
  const navLinks = navbarMenu.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbarMenu.classList.remove("active");
      navbarToggle.setAttribute("aria-expanded", "false");
      const icon = navbarToggle.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    });
  });
}

// Developed by Tej Pratap Singh