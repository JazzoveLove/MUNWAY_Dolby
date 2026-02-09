import React from "react";
import { useState, useEffect } from "react";

const CartPage = () => {
  const [cartData, setCartData] = useState(null);

  const fetchCart = async () => {
    const token = localStorage.getItem("access");

    if (token) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/cart/detail/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setCartData(data);
      } catch (error) {
        console.error("Cos sie wysypalo", error);
      }
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);
  if (!cartData) return <div>Ładowanie koszyka...</div>; // Pudełko puste?

  return (
    <div>
      {/* Pudełko pełne? Rysujemy tabelkę */}
      <h1>Twój Koszyk</h1>
      {cartData.items.map((item) => (
        <div key={item.id}>
          {item.product.name} - {item.quantity} szt.
        </div>
      ))}
    </div>
  );
};

export default CartPage;
