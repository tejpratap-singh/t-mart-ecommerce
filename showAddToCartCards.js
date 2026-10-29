import products from "./api/products.json";
import { fetchQuantityFromCartLS } from "./fetchQuantityFromCartLS";
import { getCartProductFromLS } from "./getCartProducts";
import { incrementDecrement } from "./incrementDecrement";
import { removeProdFromCart } from "./removeProdFromCart";
import { updateCartProductTotal } from "./updateCartProductTotal";

let cartProducts = getCartProductFromLS();

let filterProducts = products.filter((curProd) => {
  return cartProducts.some((curElem) => curElem.id === curProd.id);
});

console.log(filterProducts);

// -----------------------------------------------------
// to update the addToCart page
// --------------------------------------------------------
const cartElement = document.querySelector("#productCartContainer");
const templateContainer = document.querySelector("#productCartTemplate");

const showCartProduct = () => {
  if (!cartElement || !templateContainer) return;
  cartElement.innerHTML = "";

  if (filterProducts.length === 0) {
    cartElement.innerHTML = `
      <div style="
        background: #ffffff;
        border: 2px dashed #8098c8;
        border-radius: 16px;
        padding: 40px 20px;
        text-align: center;
        width: 100%;
        margin: 20px 0;
        box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      ">
        <i class="fa-solid fa-cart-shopping" style="font-size: 50px; color: #8098c8; margin-bottom: 15px; display: block;"></i>
        <h2 style="color: #1f2a44; font-size: 24px; margin-bottom: 10px;">Your Cart is Empty</h2>
        <p style="color: #64748b; font-size: 16px; margin-bottom: 25px;">Looks like you haven't added anything to your cart yet.</p>
        <a href="products.html" class="btn" style="display: inline-block; padding: 12px 28px; text-decoration: none;">Start Shopping</a>
      </div>
    `;
    const totalSection = document.querySelector(".productCartTotalElem");
    if (totalSection) totalSection.style.display = "none";
    return;
  }

  const totalSection = document.querySelector(".productCartTotalElem");
  if (totalSection) totalSection.style.display = "block";

  filterProducts.forEach((curProd) => {
    const { category, id, image, name, stock, price } = curProd;

    let productClone = document.importNode(templateContainer.content, true);

    const lSActualData = fetchQuantityFromCartLS(id, price);

    productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
    productClone.querySelector(".category").textContent = category;
    productClone.querySelector(".productName").textContent = name;
    productClone.querySelector(".productImage").src = image;

    productClone.querySelector(".productQuantity").textContent =
      lSActualData.quantity;
    productClone.querySelector(".productPrice").textContent =
      lSActualData.price;

    // handle increment and decrement button
    productClone
      .querySelector(".stockElement")
      .addEventListener("click", (event) => {
        incrementDecrement(event, id, stock, price);
      });

    productClone
      .querySelector(".remove-to-cart-button")
      .addEventListener("click", () => removeProdFromCart(id));

    cartElement.appendChild(productClone);
  });
};

// -----------------------------------------------------
// Showing the cartProducts
// --------------------------------------------------------
showCartProduct();

// -----------------------------------------------------
// calculating the card total in our cartProducts page
// --------------------------------------------------------
updateCartProductTotal();
