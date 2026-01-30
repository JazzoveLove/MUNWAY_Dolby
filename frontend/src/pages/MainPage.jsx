import React from 'react'
import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import axios from 'axios'

function MainPage(){

    const [products,setProducts] = useState([])

    useEffect (() =>{
        const fetchProducts = async () => {
            try{
                const res = await axios.get('http://127.0.0.1:8000/api/products/')
                setProducts(res.data)
            } catch (error){
                console.log(error)
            }
        }
        fetchProducts()
    },[])

    return(
        <div>
            <h1>Main Page</h1>
            <div className='product-list'>
               {products.map((product) => (
    <ProductCard key={product.id} product={product} />
))}

            </div>
        </div>
    )
}

export default MainPage