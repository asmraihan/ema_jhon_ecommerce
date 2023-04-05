import { getShoppingCart } from "../utilities/fakedb"

const cartProductsLoader = async () =>{
    const loadedProducts = await fetch('products.json')
    const products = await loadedProducts.json()

    const storedCart = getShoppingCart()
    const savedCart = [];
    for(const id in storedCart){
        const addedProduct = products.find(pd => pd.id === id) /* simillar id khujbe */
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