import { addtocart, cart, loadFromStorage } from "../../data/cart.js";

describe('test suite:addtocart', () => {
it('add existing product to cart',()=>{
    spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                
            productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity:1,
            deliveryOptions:"1"
            }]);
        });
        // Optionally, also spy on setItem if needed
        // spyOn(localStorage, 'setItem').and.callFake(() => {});
        loadFromStorage();
        addtocart(cart[0], "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 2);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart[0].quantity).toEqual(3);
});
    

    

    it("add new product to cart", () => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        // Optionally, also spy on setItem if needed
        // spyOn(localStorage, 'setItem').and.callFake(() => {});
        loadFromStorage();
        addtocart(false, "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart[0].quantity).toEqual(1);
    });
});