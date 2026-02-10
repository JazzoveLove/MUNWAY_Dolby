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

  const deleteItemFromCart = async (product_id) => {
    const token = localStorage.getItem("access");

    if (token) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/cart/items/${product_id}/`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.ok) {
          fetchCart();
        }
      } catch (error) {
        console.error("cos sie wysypalo z usuwaniem", error);
      }
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);
  if (!cartData) return <div>Ładowanie koszyka...</div>; // Pudełko puste?

  return (
    <div style={{ padding: "20px" }}>
      <h1>Twój Koszyk</h1>

      {/* Lista produktów */}
      <div style={{ marginBottom: "20px" }}>
        {cartData.items.map((item) => (
          <div
            key={item.id}
            style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}
          >
            <strong>{item.product.name}</strong> <br />
            Ilość: {item.quantity} szt. | Cena:{" "}
            <strong>{item.sub_total} zł</strong> {/* Nowe pole! */}
            <button
              onClick={() => deleteItemFromCart(item.id)}
              style={{ marginLeft: "15px", color: "red" }}
            >
              Usuń
            </button>
          </div>
        ))}
      </div>

      {/* Podsumowanie całego koszyka */}
      <div
        style={{
          marginTop: "20px",
          borderTop: "2px solid black",
          paddingTop: "10px",
        }}
      >
        <h3>
          Łącznie do zapłaty:
          <span style={{ color: "green", marginLeft: "10px" }}>
            {cartData.total_price} zł {/* Nowe pole z głównego obiektu! */}
          </span>
        </h3>

        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "black",
            color: "white",
            cursor: "pointer",
            width: "100%",
          }}
        >
          PRZEJDŹ DO KASY
        </button>
      </div>
    </div>
  );
};
export default CartPage;
