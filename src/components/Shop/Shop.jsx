import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
const Shop = () => {
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [cart, setCart] = useState([])
    const { totalProducts } = useLoaderData()

    const totalPage = Math.ceil(totalProducts / itemsPerPage)
    const pageNumbers = [...Array(totalPage).keys()]

    // Step 1 : determine total quantity of the product
    // step 2 : decide the number of items per page

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`)
            const data = await res.json()
            setProducts(data)
        }
        fetchData()
    }, [currentPage, itemsPerPage])

    useEffect(() => {
        const storedCart = getShoppingCart()
        const ids = Object.keys(storedCart)

        fetch(`http://localhost:5000/productsByIds`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)

        })
            .then(res => res.json())
            .then(cartProducts => {
                const savedCart = []
                // step1  get id of the stored product
                for (const id in storedCart) {
                    //step2 get the product by using id
                    const addedProduct = cartProducts.find(product => product._id === id)
                    //step 3 get quantity of the product
                    if (addedProduct) {
                        const quantity = storedCart[id]
                        addedProduct.quantity = quantity
                        // step4 add the addedProduct to savedCart
                        savedCart.push(addedProduct)
                        // console.log(addedProduct)
                    }
                    // step5 set the cart
                    setCart(savedCart) /* after loop ends */
                }
            })


    }, [])

    const handleAddToCart = (product) => {
        // console.log('added product', product.name)
        let newCart = []
        // const newCart = [...cart, product]
        // if product doesnt exist in cart then set quantity = 1
        // if exist update by 1
        const exists = cart.find(pd => pd._id === product._id)
        if (!exists) {
            product.quantity = 1
            newCart = [...cart, product]
        } else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id)
            newCart = [...remaining, exists]
        }
        setCart(newCart)
        addToDb(product._id)
    }

    const handleClearCart = () => {
        setCart([])
        deleteShoppingCart()
    }

    const options = [5, 10, 15, 20]
    const handleSelectChange = (event) => {
        setItemsPerPage(parseInt(event.target.value))
        setCurrentPage(0)
    }

    return (
        <>
            <div className='shop-container'>
                <div className="products-container">
                    {/* <h2>Products Coming here : {products.length}</h2> */}
                    {
                        products.map((product) => <Product
                            product={product} /* Product component e product ke pathailam */
                            key={product._id}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart
                        cart={cart}
                        handleClearCart={handleClearCart}>
                        <Link className='proceed-link' to='/orders'>
                            <button className='btn-proceed'>Review order
                                <FontAwesomeIcon icon={faArrowLeft} /></button>
                        </Link>

                    </Cart>
                </div>
            </div>
            {/* pagination */}
            <div className="pagination">
                <p>currentPage : {currentPage} & items per page : {itemsPerPage}</p>
                {
                    pageNumbers.map(number => <button
                        key={number}
                        className={currentPage === number ? 'selected' : ''}
                        onClick={() => setCurrentPage(number)}
                    >{number+1}</button>)
                }
                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {
                        options.map(option => <option key={option} value={option}>{option}</option>)
                    }
                </select>
            </div>
        </>
    );
};

export default Shop;