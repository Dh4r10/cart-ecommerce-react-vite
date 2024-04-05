import React, { useState, useEffect } from "react";
import TopMenu from "./components/TopMenu";
import Products from "./components/Products";
import {
  API_URL,
  API_RECORD_ID,
  API_ACCESS_TOKEN,
  STORAGE_PRODUCTS_CART,
} from "./utils/constants";
import { ToastContainer, toast } from "react-toastify";
import useFetch from "./hooks/useFetch";

function App() {
  const [productsCart, setProductsCart] = useState([]);

  useEffect(() => {
    getProductsCart();
  }, []);

  const url = `${API_URL}/${API_RECORD_ID}`;
  const products = useFetch(url, API_ACCESS_TOKEN);

  const getProductsCart = () => {
    const idsProducts = localStorage.getItem(STORAGE_PRODUCTS_CART);

    if (idsProducts) {
      const idsProductsSplit = idsProducts.split(",");
      setProductsCart(idsProductsSplit);
    } else {
      setProductsCart([]);
    }
  };

  const addProductCart = (id, title) => {
    const idsProducts = productsCart;
    idsProducts.push(id);
    setProductsCart(idsProducts);
    localStorage.setItem(STORAGE_PRODUCTS_CART, productsCart);
    getProductsCart();
    toast.success(`${title} añadido al carrito correctamente`);
  };

  return (
    <div className="App">
      <TopMenu
        productsCart={productsCart}
        getProductsCart={getProductsCart}
        products={products}
      />
      <Products products={products} addProductCart={addProductCart} />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </div>
  );
}

export default App;
