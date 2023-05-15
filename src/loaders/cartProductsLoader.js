import { getShoppingCart } from "../utilities/fakedb"

const cartProductsLoader = async () =>{
    const storedCart = getShoppingCart()
    // console.log(storedCart)
    const ids = Object.keys(storedCart)
    // console.log(ids)
    const loadedProducts = await fetch(`http://localhost:5000/productsByIds`, {
       method: 'POST',
       headers : {
        'content-type' : 'application/json'
       },
       body: JSON.stringify(ids)

    });

    const products = await loadedProducts.json()
    console.log('products by id',products)
    const savedCart = [];

    for(const id in storedCart){
        const addedProduct = products.find(pd => pd._id === id) /* simillar id khujbe */
        if(addedProduct){
            const quantity = storedCart[id] 
            addedProduct.quantity = quantity
            savedCart.push(addedProduct)
        }
    }
    return savedCart
    // if wan to return 2 item
    // return {products, cart : savedCart} /* cart er value e savedCart jabe */
}

export default cartProductsLoader