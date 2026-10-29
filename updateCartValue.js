export const updateCartValue = (cartProducts) => {
  const cartValue = document.querySelector("#cartValue");
  if (!cartValue) return;

  const count = Array.isArray(cartProducts) ? cartProducts.length : 0;
  cartValue.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> <span>${count}</span>`;
  return count;
};
