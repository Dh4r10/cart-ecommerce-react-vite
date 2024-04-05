import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import CartEmpty from "../../assets/svg/cart-empty.svg";
import CartFull from "../../assets/svg/cart-full.svg";
import Close from "../../assets/svg/close.svg";
import Garbage from "../../assets/svg/garbage.svg";
import { STORAGE_PRODUCTS_CART } from "../../utils/constants";
import {
  countDuplicatedItemArray,
  removeArrayDuplicates,
  removeItemArray,
} from "../../utils/arrayFunc";

import "./Cart.scss";

const Cart = (props) => {
  const { productsCart, getProductsCart, products } = props;
  const [singleProductsCart, setSingleProductsCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const widthCartContent = cartOpen ? 400 : 0;
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  useEffect(() => {
    const allProductsId = removeArrayDuplicates(productsCart);
    setSingleProductsCart(allProductsId);
  }, [productsCart]);

  useEffect(() => {
    const productData = [];
    let totalPrice = 0;

    const allProductsId = removeArrayDuplicates(productsCart);
    allProductsId.forEach((productId) => {
      const quantity = countDuplicatedItemArray(productId, productsCart);
      const productValue = {
        id: productId,
        quantity: quantity,
      };
      productData.push(productValue);

      if (!products.loading && products.result) {
        const data = products.result.data;
        data.forEach((product) => {
          productData.forEach((item) => {
            if (product.id == item.id) {
              const totalValue = product.price * item.quantity;
              totalPrice = totalPrice + totalValue;
            }
          });
        });
      }
    });

    setCartTotalPrice(totalPrice);
  }, [productsCart, products]);

  const openCart = () => {
    setCartOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeCart = () => {
    setCartOpen(false);
    document.body.style.overflow = "scroll";
  };

  const emptyCart = () => {
    localStorage.removeItem(STORAGE_PRODUCTS_CART);
    getProductsCart();
  };

  const increaseQuantity = (id) => {
    const arrayItemsCart = productsCart;
    arrayItemsCart.push(id);
    localStorage.setItem(STORAGE_PRODUCTS_CART, arrayItemsCart);
    getProductsCart();
  };

  const decreaseQuantity = (id) => {
    const arrayItemsCart = productsCart;
    const result = removeItemArray(arrayItemsCart, id.toString());
    localStorage.setItem(STORAGE_PRODUCTS_CART, result);
    getProductsCart();
  };

  return (
    <>
      <Button variant="link" className="cart">
        <img
          src={productsCart.length > 0 ? CartFull : CartEmpty}
          alt="cart-empety"
          className="mi-imagen-svg"
          onClick={openCart}
        />
      </Button>
      <div className="cart-content" style={{ width: widthCartContent }}>
        <CartContentHeader closeCart={closeCart} emptyCart={emptyCart} />
        <div className="cart-content__products">
          {singleProductsCart.map((idProductCart, id) => (
            <CartContentProducts
              key={id}
              products={products}
              idsProductsCart={productsCart}
              idProductCart={idProductCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          ))}
        </div>
        <CartContentFooter cartTotalPrice={cartTotalPrice} />
      </div>
    </>
  );
};

const CartContentHeader = (props) => {
  const { closeCart, emptyCart } = props;
  return (
    <div className="cart-content__header">
      <div>
        <img src={Close} alt="close" onClick={closeCart} />
        <h2>Carrito</h2>
      </div>

      <Button variant="link" onClick={emptyCart}>
        Vaciar
        <img src={Garbage} alt="garbage" />
      </Button>
    </div>
  );
};

const CartContentProducts = (props) => {
  const {
    products: { result, loading, error },
    idsProductsCart,
    idProductCart,
    increaseQuantity,
    decreaseQuantity,
  } = props;

  if (!loading && result) {
    const { data } = result;
    return data.map((product, id) => {
      if (idProductCart == product.id) {
        const quantify = countDuplicatedItemArray(product.id, idsProductsCart);
        return (
          <RenderProduct
            key={id}
            product={product}
            quantify={quantify}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
        );
      } else {
        return null;
      }
    });
  }
};

const RenderProduct = (props) => {
  const {
    product: { id, image, title, nombre, price },
    quantify,
    increaseQuantity,
    decreaseQuantity,
  } = props;
  return (
    <div className="cart-content__product">
      <img src={image} alt={nombre} />
      <div className="cart-content__product-info">
        <div>
          <h3>{title.substr(0, 25)}...</h3>
          <p>{price.toFixed(2)} $ / unidad</p>
        </div>
        <div>
          <p>En el carro: {quantify} ud.</p>
          <div>
            <button onClick={() => increaseQuantity(id)}>+</button>
            <button onClick={() => decreaseQuantity(id)}>-</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartContentFooter = (props) => {
  const { cartTotalPrice } = props;
  return (
    <div className="cart-content__footer">
      <div>
        <p>Total aproximado: </p>
        <p>{cartTotalPrice.toFixed(2)} $</p>
      </div>
      <Button>Tramitar pedido</Button>
    </div>
  );
};

export default Cart;
