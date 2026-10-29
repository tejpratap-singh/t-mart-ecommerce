const footerHTML = `
    <div class="footer-container container">
      <div class="content_1">
        <img src="./images/log.png" alt="T MART Logo" />
        <p>
          Welcome to T MART, <br />
          your trusted destination for
          <br />
          electronics, gadgets and smart shopping.
        </p>
        <img src="https://i.postimg.cc/Nj9dgJ98/cards.png" alt="cards" />
      </div>

      <div class="content_2">
        <h4>SHOPPING</h4>
        <a href="products.html">Computer Store</a>
        <a href="products.html">Laptop Store</a>
        <a href="products.html">Accessories</a>
        <a href="products.html">Sales & Discount</a>
      </div>

      <div class="content_3">
        <h4>EXPERIENCE</h4>
        <a href="contact.html">Contact Us</a>
        <a href="about.html">About Us</a>
        <a href="addToCart.html">Shopping Cart</a>
        <a href="contact.html">Return and Exchange</a>
      </div>

      <div class="content_4">
        <h4>NEWSLETTER</h4>
        <p>
          Be the first to know about new
          <br />
          arrivals, sales & promos!
        </p>

        <div class="f-mail">
          <input type="email" placeholder="Your Email" />
          <i class="fa-solid fa-envelope"></i>
        </div>

        <hr />
      </div>
    </div>

    <div class="f-design">
      <div class="f-design-txt">
        <p>Designed & Developed by Tej Pratap Singh</p>
      </div>
    </div>`;

const footerElem = document.querySelector(".section-footer");
if (footerElem && footerElem.children.length === 0) {
  footerElem.innerHTML = footerHTML;
}