import { cart,addtocart,updatecartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { currency } from "../scripts/util/money.js";

let productHTML = '';
products.forEach(product => {
    productHTML += ` 
    
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="image/ratings/rating-${(product.rating.stars * 10)}.png">
            <div class="product-rating-count link-primary">
               ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${currency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantityselector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-${product.id}">
            <img src="image/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-addtocart" 
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
});



document.querySelector('.js_product').innerHTML = productHTML;
updatecartQuantity();
document.querySelectorAll('.js-addtocart').forEach((button) => {
    button.addEventListener('click', () => {
        const {productId} = button.dataset;
        const prod = button.dataset.productId;
        let quan = document.querySelector(`.js-quantityselector-${productId}`);
        let matchingitem = cart.find(item => item.productId === prod);
        let finalQuan = Number(quan.value);
        addtocart(matchingitem,prod,finalQuan);
        updatecartQuantity();
        let addmessage = document.querySelector(`.js-added-${productId}`);
        addmessage.classList.add("added-to-cart-visible");
        setTimeout(() => {
            addmessage.classList.remove("added-to-cart-visible");
        }, 2000);

    });
});