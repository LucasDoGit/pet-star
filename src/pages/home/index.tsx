import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import styles from './home.module.css'
import { BsCartPlus } from 'react-icons/bs'

import { api } from '../../services/api';
import { CartContext } from '../../contexts/CartContext';
import toast from 'react-hot-toast';

export interface ProductProps {
    id: number,
    title: string,
    description: string,
    price: number,
    cover: string
}

export function Home() {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const { addItemCart } = useContext(CartContext)

    useEffect(() => {
        async function getProducts() {
            const response = await api.get("/products");

            setProducts(response.data)
        }

        getProducts()
    }, [])

    function handleAddCartItem(product: ProductProps) {
        addItemCart(product)
        toast.success("Produto adicionado com sucesso!", {
            style: {
                backgroundColor: "#121212",
                color: "#fff"
            }
        })
    }

    return (
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
                                    currency: "BRL"
                                })}
                            </strong>
                            <button className={styles.product__btnPay}>
                                <BsCartPlus size={20} color="#fff" onClick={() => handleAddCartItem(product)} />
                            </button>
                        </div>
                    </section>
                )}
            </div>
        </main>
    )
}