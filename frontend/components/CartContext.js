import React, { createContext, useContext, useState } from 'react';

// Create a Cart Context
const CartContext = createContext(undefined);

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  const setQuantityCart = (itemKey, delta) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [itemKey]: Math.max((prevItems[itemKey] || 0) + delta, 0),
    }));
  };

  const addToCart = (itemKey, quantity) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [itemKey]: (prevItems[itemKey] || 0) + quantity,
    }));
  };

  const emptyCart = () => {
    setCartItems({});
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, emptyCart, setQuantityCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
