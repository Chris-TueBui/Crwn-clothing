import { createContext, useState } from "react";
import PRODUCTS from '../shop-data.json';

export const ProductContext = createContext({
    products: [],
});

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS);
    // console.log(products);
    const value = {products};
    return (
        <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
    );
}