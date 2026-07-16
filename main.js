import "./style.css";
import products from "./api/products.json";
import { showProductContainer } from "./homeProductCards";

// Load all products on homepage
showProductContainer(products);

// ================= Search Function =================
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
  const searchValue = searchInput.value.toLowerCase();

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchValue) ||
      product.category.toLowerCase().includes(searchValue) ||
      product.brand.toLowerCase().includes(searchValue)
    );
  });

  document.querySelector("#productContainer").innerHTML = "";

  if (filteredProducts.length === 0) {
  document.querySelector("#productContainer").innerHTML = `
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

      <h2 style="
        color:#8098c8;
        font-size:32px;
        margin-bottom:15px;
      ">
        🔍 No Products Found
      </h2>

      <p style="
        color:#5b6478;
        font-size:18px;
      ">
        Try searching for another product.
      </p>

    </div>
  `;
  return;
}
document.querySelector("#productContainer").innerHTML = `
  <div style="
    background:#eef5f3;
    border-left:6px solid #8098c8;
    border-radius:12px;
    padding:18px 25px;
    margin-bottom:25px;
    box-shadow:0 5px 15px rgba(128,152,200,.15);
  ">
    <h2 style="
      color:#1f2a44;
      margin:0;
      font-size:28px;
    ">
      🔍 Search Results
    </h2>

    <p style="
      margin-top:8px;
      color:#5b6478;
      font-size:17px;
    ">
      Showing <strong>${filteredProducts.length}</strong> Product(s)
    </p>
  </div>
`;
  showProductContainer(filteredProducts);
});
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});
// Developed by Tej Pratap Singh