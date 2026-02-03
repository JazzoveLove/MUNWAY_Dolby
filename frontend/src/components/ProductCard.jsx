import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        {/* 1. Obrazek (zamyka się sam!) */}
        <img src="https://placehold.co/300x400" alt={product.name} />

        {/* 2. Treść pod obrazkiem */}
        <h3>{product.name}</h3>
        <p>{product.price} PLN</p>

        {/* Opcjonalnie tekst przycisku */}
        <span>Zobacz produkt</span>
      </Link>
    </div>
  );
};

export default ProductCard;
