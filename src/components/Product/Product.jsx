import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
const Product = (props) => {
    // console.log(props)
    const {img, name, seller, ratings, price, } = props.product
    const handleAddToCart = props.handleAddToCart
 
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
            <h6 className='product-name'>{name}</h6>
            <p className=''>Price : ${price}</p>
            <p>Manufacturer : {seller}</p>
            <p>Rating : {ratings} star</p>
            </div>
            <button onClick={()=>handleAddToCart(props.product)} className='btn-add'>Add to Cart <FontAwesomeIcon icon={faShoppingCart} /></button>
        </div>
    );
};

export default Product;