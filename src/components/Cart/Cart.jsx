import React from 'react';
import './Cart.css'

const Cart = ({cart}) => { /* op3 */
    // const cart = props.cart  /* op1 */
    // const {cart} = props /* opt 2 */
    // console.log(cart)
    let totalPrice = 0;
    let totalShipping = 0;

    for( const product of cart){
        totalPrice = totalPrice + product.price
        totalShipping = totalShipping + product.shipping
    }
    const tax = totalPrice*7/100;
    const grandTotal = totalPrice + totalShipping + tax
    return (
        <div className='cart'>
               <h4>Order Summary</h4>
                <p>Selected Items : {cart.length}</p>
                <p>Total price : ${totalPrice}</p>
                <p>Total shipping : ${totalShipping}</p>
                <p>Tax : ${tax.toFixed(2)}</p>
                <h6>Grand Total : ${grandTotal.toFixed(2)}</h6>
        </div>
    );
};

export default Cart;