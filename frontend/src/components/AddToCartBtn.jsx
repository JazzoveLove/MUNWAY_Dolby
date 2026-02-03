import React from "react";

const AddToCartBtn = ({ product }) => {
  const { product_id } = product;

  const handleAdding = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/cart/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: product_id }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Błąd odpowiedzi serwera");
      }

      alert("Produkt dodany do koszyka!");
    } catch (error) {
      console.error("Błąd dodawania:", error);
      alert("Wystąpił błąd!");
    }
  };

  return <button onClick={handleAdding}>Dodaj do koszyka</button>;
};

export default AddToCartBtn;
