import React, { useEffect, useState } from "react"; // Ładniejszy import
import { useParams } from "react-router-dom";
import axios from 'axios';



function ProductPage() {

    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`);
                setProduct(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProduct();
    }, [id]); 

    if (!product) return <div>Loading...</div>;
        return (
                <div className="product-container">
                {/* 1. ZDJĘCIE - Pamiętaj o doklejeniu adresu serwera! */}
                <img 
                    src={product.image ? product.image : 'https://placehold.co/600x400'} 
                    alt={product.name}
                />

                {/* 2. Reszta danych */}
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p><strong>Cena: {product.price} PLN</strong></p>
                
                {/* Tutaj kiedyś dodamy przycisk "Kup" */}
                </div>
            );
}

export default ProductPage;