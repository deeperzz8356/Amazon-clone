export let cart=[];
loadFromStorage();
export function loadFromStorage() {
    cart= JSON.parse(localStorage.getItem('cart'));
if (!cart) {
    cart=[
        {
            productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity:2,
            deliveryOptions:"1"
        },{
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity:1,
            deliveryOptions:"2"
        }
    ];
    
}
}


function savetostorage() {
    localStorage.setItem('cart',JSON.stringify(cart));
}



export function addtocart(matchingitem,prod
    ,finalQuan) {
    if (matchingitem) {
      matchingitem.quantity += finalQuan;
  } else {
  
      cart.push({
          productId: prod,
          quantity: finalQuan,
          deliveryOptions:"1"
      });
  }
    savetostorage();
  }

export  function removefromcart(prodid) {
    let newarr=[];
    cart.forEach((ele) => {
        if(prodid !== ele.productId){
               newarr.push(ele);
        }
    });
    cart=newarr;
    
    savetostorage();
  }
export  function updatecartQuantity() {
let cartQuantity=0;
    cart.forEach((ele) => {
        cartQuantity += ele.quantity;
    })

    document.querySelector(".js-cartQ").innerHTML = cartQuantity;

   
}
export function updatecheckoutQuantity() {
    let cartQuantity=0;
        cart.forEach((ele) => {
            cartQuantity += ele.quantity;
        })
    
        document.querySelector(".js-checkoutQuantity").innerHTML = cartQuantity;
    
       
    }
export  function updateQuantity(productId,quaninput) {
let matchingitem;
    cart.forEach((ele) => {
        if (ele.productId===productId) {
          matchingitem=ele;
        }
        if (quaninput>=0 && quaninput<=1000) {
            matchingitem.quantity=quaninput;
        } else {
            matchingitem.quantity=0;
        }
        gm
    })

    savetostorage();

   
}
export function updatedeliveryoption(productId,deliveryOptions){

let matchingitem;
cart.forEach(ele=> {
    if(productId=== ele.productId){
        matchingitem=ele;
    }
});
matchingitem.deliveryOptions=deliveryOptions;
savetostorage();
}