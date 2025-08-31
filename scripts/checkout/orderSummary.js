import { cart, removefromcart, updatecheckoutQuantity, updateQuantity, updatedeliveryoption } from "../../data/cart.js";
import { getProduct} from "../../data/products.js";
import { currency } from "../util/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions,getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderpaymentsummary } from "./paymentSummary.js";
export  function renderordersummary() {


  let cartsummaryHTML = '';
  cart.forEach(cartItem => {
    const productId = cartItem.productId;
    let matchingproduct=getProduct(productId);

    let deliveryOption = cartItem.deliveryOptions;
    const deloption=getDeliveryOption(deliveryOption);
   
    const today = dayjs();
    const deliverDate = today.add(deloption.deliverDays, 'days');
    const dateString = deliverDate.format('dddd, MMMM D');

    cartsummaryHTML +=
      `<div class="cart-item-container  js-cartitem js-cartitem-${matchingproduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingproduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                   ${matchingproduct.name}
                </div>
                <div class="product-price">
                  ${currency(matchingproduct.priceCents)}
                </div>
                <div class="product-quantity js-check-quantity-${matchingproduct.id}">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingproduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update" data-product-id="${matchingproduct.id}">
                    Update
                    
                  </span>
                  <input type="number" class="quantity-input js-input-${matchingproduct.id}">
                  <span class="save-quantity-link link-primary js-save" data-product-id="${matchingproduct.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete js-delete-${matchingproduct.id} " data-product-id="${matchingproduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
               ${deliverHTML(matchingproduct, cartItem)}
              </div>
            </div>
          </div>`


  });
  document.querySelector(".js-cartsummary").innerHTML = cartsummaryHTML;

  function deliverHTML(matchingproduct, cartItem) {
    let html = '';
    deliveryOptions.forEach(deliveryOption => {
      const today = dayjs();
      const deliverDate = today.add(deliveryOption.deliverDays, 'days');
      const dateString = deliverDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0 ? "Free" : `$${currency(deliveryOption.priceCents)}`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptions; // <-- correct check
      html += `
      <div class="delivery-option js-delivery-options" data-product-id="${matchingproduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingproduct.id}"
          data-product-id="${matchingproduct.id}"
          data-delivery-option-id="${deliveryOption.id}"
          ${isChecked ? "checked" : ""}
        >
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
      </div>
    `;
    });
    return html;
  }
  updatecheckoutQuantity();

  document.querySelectorAll(".js-delete")
    .forEach(link => {
      link.addEventListener('click', () => {
        let prod = link.dataset.productId;
        removefromcart(prod);
        
        const container = document.querySelector(`.js-cartitem-${prod}`);
        container.remove();
        updatecheckoutQuantity();
        renderpaymentsummary();
      });
    });

  document.querySelectorAll(".js-update")
    .forEach(link => {
      link.addEventListener('click', () => {
        let productId = link.dataset.productId;
        const container = document.querySelector(`.js-cartitem-${productId}`);
        container.classList.add("is-editing-quantity");

      });
    });

  document.querySelectorAll(".js-save")
    .forEach(link => {
      link.addEventListener('click', () => {
        let productId = link.dataset.productId;
        const container = document.querySelector(`.js-cartitem-${productId}`);
        container.classList.remove("is-editing-quantity");
        const newquan = document.querySelector(`.js-input-${productId}`);
        const quaninput = Number(newquan.value);
        updateQuantity(productId, quaninput);
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML = quaninput;
        updatecheckoutQuantity();
        renderpaymentsummary();
      });
    });

  document.querySelectorAll(".delivery-option-input")
    .forEach(input => {
      input.addEventListener('change', () => {
        const { productId, deliveryOptionId } = input.dataset;
        updatedeliveryoption(productId, deliveryOptionId);
        // Optionally, re-render the cart summary to update the delivery date
        renderordersummary();
        renderpaymentsummary();
      });
    });
}

// renderordersummary();
