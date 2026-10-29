import { getCartProductFromLS } from "./getCartProducts";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

// -----------------------------------------------------
// to get the cart data from localStorage
// to update the cart value and also to get the data always ready from localStorage
// --------------------------------------------------------
getCartProductFromLS();

// -----------------------------------------------------
// to add the data into localStorage
// --------------------------------------------------------
export const addToCart = (event, id, stock) => {
  let arrLocalStorageProduct = getCartProductFromLS();

  const currentProdElem = document.querySelector(`#card${id}`);
  if (!currentProdElem) return;

  let quantity = Number(currentProdElem.querySelector(".productQuantity").innerText) || 1;
  let rawPrice = currentProdElem.querySelector(".productPrice").innerText;
  let unitPrice = Number(rawPrice.replace("₹", "").trim()) || 0;

  let existingProd = arrLocalStorageProduct.find(
    (curProd) => curProd.id === id
  );

  if (existingProd) {
    let newQuantity = Number(existingProd.quantity) + quantity;
    if (newQuantity > stock) {
      newQuantity = stock;
      showToast("add", id, `Max available stock (${stock}) reached!`);
    } else {
      showToast("add", id, `Cart updated (${newQuantity} in cart)`);
    }

    let updatedPrice = Number((unitPrice * newQuantity).toFixed(2));

    arrLocalStorageProduct = arrLocalStorageProduct.map((curProd) => {
      return curProd.id === id
        ? { id, quantity: newQuantity, price: updatedPrice }
        : curProd;
    });

    localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));
    updateCartValue(arrLocalStorageProduct);
    return;
  }

  // New product
  if (quantity > stock) {
    quantity = stock;
  }
  let totalPrice = Number((unitPrice * quantity).toFixed(2));

  arrLocalStorageProduct.push({ id, quantity, price: totalPrice });
  localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));

  updateCartValue(arrLocalStorageProduct);
  showToast("add", id, `Product added to cart successfully.`);
};
// Developed by Tej Pratap Singh