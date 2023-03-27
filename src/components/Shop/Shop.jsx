import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    useEffect(()=>{ /* annonymouse func which will run at any change */
    fetch('products.json')
    .then(res => res.json())
    .then(data => setProducts(data)) /* data setProducts e set korle data jodi fetch hoy tahole products e pabo */
    },[]) /* empty array for showing after loading component  */
    
    const handleAddToCart =(product)=>{
        // console.log('added product', product.name)
        const newCart = [...cart, product]
        setCart(newCart)
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
            {/* <h2>Products Coming here : {products.length}</h2> */}
            {
                products.map((product)=> <Product 
                product={product} /* Product component e product ke pathailam */
                key={product.id}
                handleAddToCart={handleAddToCart}
                ></Product>)
            }
            </div>
            <div className="cart-container">
             <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;