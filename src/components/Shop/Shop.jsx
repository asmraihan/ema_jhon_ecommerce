import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
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

    useEffect(()=>{
        const storedCart = getShoppingCart()
        const savedCart =[]
        // step1  get id of the stored product
        for(const id in storedCart){
            //step2 get the product by using id
            const addedProduct = products.find(product=> product.id === id)
            //step 3 get quantity of the product
            if(addedProduct){
                const quantity = storedCart[id]
                addedProduct.quantity = quantity
                // step4 add the addedProduct to savedCart
                savedCart.push(addedProduct)
                // console.log(addedProduct)
            }
            // step5 set the cart
            setCart(savedCart) /* after loop ends */
        }
    },[products])

    const handleAddToCart =(product)=>{
        // console.log('added product', product.name)
        let newCart =[]
        // const newCart = [...cart, product]
        // if product doesnt exist in cart then set quantity = 1
        // if exist update by 1
        const exists = cart.find(pd => pd.id === product.id)
        if(!exists){
            product.quantity = 1
            newCart = [...cart, product]
        }else{
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id)
            newCart = [...remaining, exists]
        }
        setCart(newCart)
        addToDb(product.id)
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