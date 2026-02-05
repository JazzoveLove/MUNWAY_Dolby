import React, { createContext, useState, useEffect } from "react";

const CartContext = createContext();
export default CartContext;

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      setCartCount(0);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/cart/add/", {
        method: "GET", // Metoda GET = brak body!
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCartCount(data.total_items);
        console.log("Licznik koszyka zaktualizowany:", data.total_items);
      } else {
        console.log("Błąd serwera przy pobieraniu koszyka");
      }
    } catch (error) {
      console.error("Błąd połączenia: ", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
