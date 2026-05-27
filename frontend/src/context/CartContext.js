import { createContext, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);

  // Add To Cart
  const addToCart = (product) => {

    const existingItem = cartItems.find(
      (item) => item.id === product.id
    );

    if (existingItem) {

      const updatedCart = cartItems.map((item) =>

        item.id === product.id

          ? { ...item, quantity: item.quantity + 1 }

          : item
      );

      setCartItems(updatedCart);

    } else {

      setCartItems([
        ...cartItems,
        { ...product, quantity: 1 }
      ]);

    }

    alert("Product Added To Cart");
  };

  // Remove From Cart
  const removeFromCart = (id) => {

    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );

    setCartItems(updatedCart);
  };

  // Increase Quantity
  const increaseQuantity = (id) => {

    const updatedCart = cartItems.map((item) =>

      item.id === id

        ? { ...item, quantity: item.quantity + 1 }

        : item
    );

    setCartItems(updatedCart);
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {

    const updatedCart = cartItems.map((item) =>

      item.id === id

        ? {
            ...item,
            quantity:
              item.quantity > 1
                ? item.quantity - 1
                : 1
          }

        : item
    );

    setCartItems(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;