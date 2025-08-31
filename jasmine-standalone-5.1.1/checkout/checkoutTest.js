import { renderordersummary } from "../../scripts/checkout/orderSummary.js";
import {  loadFromStorage } from "../../data/cart.js";

describe("test suite:ordersummary",()=>{
    it('display the cart',()=>{
        document.querySelector(".js-tst-container").innerHTML=`
         <div class="js-cartsummary"></div>
         <a class="return-to-home-link js-checkoutQuantity"
            href="amazon.html"></a>
        `;
        const productId1="e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
                    
        const productId2="15b6fc6f-327a-4ec4-896f-486349e85a3d";
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity:2,
                    deliveryOptions:"1"
                },{
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity:1,
                    deliveryOptions:"2"
                }
            ]);
        });
        loadFromStorage();
        renderordersummary();
        expect(
            document.querySelectorAll(".js-cartitem").length
        ).toEqual(2);
        const quantityContainer1 = document.querySelector(`.js-check-quantity-${productId1}`);
        expect(quantityContainer1.querySelector('.quantity-label').textContent).toBe("2");

        const quantityContainer2 = document.querySelector(`.js-check-quantity-${productId2}`);
        expect(quantityContainer2.querySelector('.quantity-label').textContent).toBe("1");
        
    });
    
    
    it('removes a product',()=>{
        document.querySelector(".js-tst-container").innerHTML=`
        <div class="js-cartsummary"></div>
         <a class="return-to-home-link js-checkoutQuantity"
            href="amazon.html"></a>
         <div class="js-paymentsummary"></div>
        `;
        const productId1="e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
                    
        const productId2="15b6fc6f-327a-4ec4-896f-486349e85a3d";
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity:2,
                    deliveryOptions:"1"
                },{
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity:1,
                    deliveryOptions:"2"
                }
            ]);
        });
        loadFromStorage();
        renderordersummary();
        document.querySelector(`.js-delete-${productId1}`).click();
        expect(
            document.querySelectorAll(".js-cartitem").length
        ).toEqual(1);
     expect(document.querySelector(`.js-cartitem-${productId1}`)).toEqual(null);
    });
})
