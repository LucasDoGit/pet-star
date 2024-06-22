import { useContext, useState } from "react";

import { CartContext } from '../../contexts/CartContext';
import { Link } from "react-router-dom";
import styles from './cart.module.css'
import Modal from "./modal";

export function Cart() {
    const { cart, total, addItemCart, removeItemCart, clearCart } = useContext(CartContext);
    const [modalVisible, setModalVisible] = useState(false);

    function handleCheckout(){
        clearCart()
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Meus Produtos</h1>

            {cart.length === 0 && (
                <div className={styles.empty_cart}>
                    <p className={styles.empty_cart__title}>Ops o seu carrinho está vázio!</p>
                    <Link
                        to={"/"}
                        className={styles.empty_cart__btn}
                    >
                        Acessar Produtos
                    </Link>
                </div>
            )}

            {cart.map((product) => (
                <section key={product.id} className={styles.product}>
                    <img
                        className={styles.product__img}
                        src={product.cover}
                        alt={product.title}
                    />
                    <strong>
                        Preço: {product.price}
                    </strong>

                    <div className={styles.product__amount}>
                        <button
                            className={styles.product__amount__btn}
                            onClick={() => removeItemCart(product)}
                        >
                            -
                        </button>

                        {product.amount}

                        <button
                            className={styles.product__amount__btn}
                            onClick={() => addItemCart(product)}
                        >
                            +
                        </button>
                    </div>

                    <strong className={styles.product_total}>
                        SubTotal: {product.total.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}
                    </strong>

                </section>

            ))}
            {cart.length !== 0 && 
                <div className={styles.checkout}>
                    <p className={styles.checkout__total}>Total: {total}</p>
                    <button className={styles.btn__checkout} onClick={() => handleCheckout() }>Finalizar compra</button>
                </div>
            }
            <Modal show={modalVisible} onClose={closeModal}>
                <div className={styles.modal}>
                        <h2 className={styles.modal__title}>Obrigado pela preferência! 😊</h2>
                        <span className={styles.modal__span}>Pedido enviado para o Pet Shop. </span>
                        <button  className={styles.btn__checkout} onClick={() => closeModal()}>Fechar</button>
                </div>
            </Modal>
        </div>
    )
}