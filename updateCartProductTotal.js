import { getCartProductFromLS } from "./getCartProducts";

export const updateCartProductTotal = () => {
  let productSubTotal = document.querySelector(".productSubTotal");
  let productFinalTotal = document.querySelector(".productFinalTotal");
  let productTax = document.querySelector(".productTax");
  let taxRow = document.querySelector(".tax-row");

  let localCartProducts = getCartProductFromLS();

  let totalProductPrice = localCartProducts.reduce((accum, curElem) => {
    let productPrice = parseInt(curElem.price) || 0;
    return accum + productPrice;
  }, 0);

  productSubTotal.textContent = `₹${totalProductPrice}`;

  if (localCartProducts.length === 0) {

    // Cart empty
    productTax.textContent = "₹0";
    productFinalTotal.textContent = "₹0";

    if (taxRow) {
      taxRow.style.display = "none";
    }

  } else {

    // Product added
    productTax.textContent = "₹50";
    productFinalTotal.textContent = `₹${totalProductPrice + 50}`;

    if (taxRow) {
      taxRow.style.display = "flex";
    }

  }
};