import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import styles from './home.module.css'
import { BsCartPlus } from 'react-icons/bs'

import { api } from '../../services/api';

interface ProductProps {
    id: number,
    title: string,
    description: string,
    price: number,
    cover: string
}

export function Home(){
    const [products, setProducts] = useState<ProductProps[]>([]);

    useEffect(() => {
        async function getProducts() {
            const response = await api.get("/products");
            
            setProducts(response.data)
        }

        getProducts()
    }, [])
    
    return(
        <main className={styles.container}>
            <h1 className={styles.title}>Produtos Recentes</h1>
            <div className={styles.productsGrid}>
                {products.map((product) => 
                    <section className={styles.product} key={product.id}>
                    <Link to={`/detail/${product.id}`}>
                        <img src={product.cover} alt={product.title} className={styles.product__img} />
                        <p className={styles.product__title}>{product.title}</p>
                    </Link>
                    <div className={styles.product__payContainer}>
                        <strong className={styles.product_value}>
                            {product.price.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL"})}
                        </strong>
                        <button className={styles.product__btnPay}>
                            <BsCartPlus size={20} color="#fff" />
                        </button>
                    </div>
            </section>
                )}
            </div>
        </main>
    )
}