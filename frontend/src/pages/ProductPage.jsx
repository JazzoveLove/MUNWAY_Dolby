import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// WAŻNE: Musisz zaimportować guzik, żeby go użyć!
// (Upewnij się, że ścieżka '../components/AddToCartBtn' jest poprawna dla Twojej struktury folderów)
import AddToCartBtn from "../components/AddToCartBtn";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/products/${id}/`,
        );
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  // Jeśli produktu nie ma, wyświetl ładowanie
  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-container">
      {/* 1. ZDJĘCIE */}
      <img
        src={product.image ? product.image : "https://placehold.co/600x400"}
        alt={product.name}
        style={{ maxWidth: "100%", height: "auto" }} // Dodałem mały styl, żeby zdjęcie nie wybuchło
      />

      {/* 2. DANE PRODUKTU */}
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p style={{ fontSize: "1.2em", margin: "20px 0" }}>
        <strong>Cena: {product.price} PLN</strong>
      </p>

      {/* 3. TWÓJ NOWY GUZIK */}
      {/* Przekazujemy cały obiekt product do guzika */}
      <AddToCartBtn product={product} />
    </div>
  );
}

export default ProductPage;
