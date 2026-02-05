import React, { useContext } from "react";
import CartContext from "../context/CartContext";

const AddToCartBtn = ({ product }) => {
  const { fetchCart } = useContext(CartContext);

  const prodIdToSend = product.id || product.product_i;

  const handleAdding = async () => {
    const token = localStorage.getItem("access");

    if (token) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/cart/add/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ product_id: prodIdToSend }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Błąd odpowiedzi serwera");
        }
        const data = await response.json();
        fetchCart();

        alert("Produkt dodany do koszyka!");
      } catch (error) {
        console.error("Błąd dodawania:", error);
        alert(error.message);
      }
    } else {
      console.log("Jestem gościem - brak tokena");
      alert("Zaloguj się, aby dodać do koszyka!");
    }
  };

  return <button onClick={handleAdding}>Dodaj do koszyka</button>;
};

export default AddToCartBtn;
