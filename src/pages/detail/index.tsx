import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { BsCartPlus } from "react-icons/bs";
import toast from "react-hot-toast";

import { ProductProps } from "../home";
import { CartContext } from '../../contexts/CartContext'
import { api } from "../../services/api";
import styles from './detail.module.css'

export function ProductDetail(){
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<ProductProps>()
    const navigate = useNavigate();

    const { addItemCart } = useContext(CartContext)

    useEffect(() => {
        async function getProduct() {
            
            await api.get(`/products/${id}`)
                .then((res) => {
                    setProduct(res.data)
                    setLoading(false)
                })
                // .catch((err) => {
                //     console.log("Erro ao tentar requisitar produto: ", err)
                //     navigate("/")
                //     return;
                // })
        }

        getProduct();
    }, [id])

    function handleAddCartItem(product: ProductProps) {
        addItemCart(product)
        toast.success("Produto adicionado com sucesso!", {
            style: {
                backgroundColor: "#121212",
                color: "#fff"
            }
        })
        navigate("/cart")
    }

    if (loading || !product) {
        return (
            <div className={styles.loading}>
                <h4 className={styles.loading__title}>Carregando detalhes...</h4>
            </div>
        )
    }

    return (
        <main className={styles.container}>
            <section className={styles.container__product}>
                <div className={styles.produto}>
                    <img
                        className={styles.product__foto}
                        src={product?.cover}
                        alt={product?.title}
                    />
                    <div className={styles.product__inf}>
                        <h1 className={styles.product__title}>{product?.title}</h1>
                        <p className={styles.product__description}>{product?.description}</p>
                        <div className={styles.product__payment}>
                            <strong className={styles.product__payment__price}>
                                {product?.price.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                })}
                            </strong>
                            <button className={styles.product__payment__btn} onClick={() => handleAddCartItem(product)}>
                                <BsCartPlus size={20} color="#fff" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}