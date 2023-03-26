import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    const [products, setProducts] = useState([])
    useEffect(()=>{ /* annonymouse func which will run at any change */
    fetch('../../../public/fakeData/products.json')
    .then(res => res.json())
    .then(data => setProducts(data)) /* data setProducts e set korle data jodi fetch hoy tahole products e pabo */
    },[]) /* empty array for showing after loading component  */
    
    return (
        <div className='shop-container'>
            <div className="products-container">
            {/* <h2>Products Coming here : {products.length}</h2> */}
            {
                products.map((product)=> <Product 
                product={product} /* Product component e product ke pathailam */
                key={product.id}></Product>)
            }
            </div>
            <div className="cart-container">
                <h4>Order Summary</h4>
            </div>
        </div>
    );
};

export default Shop;