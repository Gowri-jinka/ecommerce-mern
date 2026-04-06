import { createContext, useContext, useState } from "react";  

export const AppContext = createContext(); // create global container 

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ADD TO CART
  const addToCart = (product) => {                
    setCart((prev) => {
      const exist = prev.find(item => item._id === product._id);

      if (exist) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // REMOVE
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  // ⚠️ FIXED: use quantity not qty
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // ⚠️ FIXED: use quantity
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        totalPrice
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ✅ CUSTOM HOOK (CORRECT PLACE to use useContext)
export const useCart = () => useContext(AppContext);