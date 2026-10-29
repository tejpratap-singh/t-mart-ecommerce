import { getCartProductFromLS } from "./getCartProducts";
import { showToast } from "./showToast";
import { updateCartProductTotal } from "./updateCartProductTotal";
import { updateCartValue } from "./updateCartValue";

export const removeProdFromCart = (id) => {
  let cartProducts = getCartProductFromLS();
  cartProducts = cartProducts.filter((curProd) => curProd.id !== id);

  // update the localStorage after removing the item
  localStorage.setItem("cartProductLS", JSON.stringify(cartProducts));

  //   to remove the div onclick
  let removeDiv = document.getElementById(`card${id}`);
  if (removeDiv) {
    removeDiv.remove();

    //show toast when product added to the cart
    showToast("delete", id);
  }

  // Show empty cart UI if all items removed
  if (cartProducts.length === 0) {
    const cartElement = document.querySelector("#productCartContainer");
    if (cartElement) {
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
    }
    const totalSection = document.querySelector(".productCartTotalElem");
    if (totalSection) totalSection.style.display = "none";
  }

  // -----------------------------------------------------
  // calculating the card total in our cartProducts page
  // --------------------------------------------------------
  updateCartProductTotal();

  updateCartValue(cartProducts);
};
