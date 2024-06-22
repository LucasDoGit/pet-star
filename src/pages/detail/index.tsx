import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { BsCartPlus } from "react-icons/bs";
import toast from "react-hot-toast";

import { ProductProps } from "../home";
import { CartContext } from '../../contexts/CartContext'
import { api } from "../../services/api";
import styles from './detail.module.css'

export function ProductDetail() {
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
                .catch((err) => {
                    console.log("Erro ao tentar requisitar produto: ", err)
                    navigate("/")
                    return;
                })
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
            <section className={styles.product_detail}>
                <div className={styles.image_container}>
                    <img
                        className={styles.image}
                        src={product?.cover}
                        alt={product?.title}
                    />
                </div>
                <div className={styles.information}>
                    <h1 className={styles.information__title}>{product?.title}</h1>
                    <p className={styles.information__description}>{product?.description}</p>
                    <div className={styles.payment}>
                        <strong className={styles.payment__price}>
                            {product?.price.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            })}
                        </strong>
                        <button className={styles.payment__btn} onClick={() => handleAddCartItem(product)}>
                            <BsCartPlus size={20} color="#fff" />
                        </button>
                    </div>
                </div>
            </section>
        </main>
    )
}