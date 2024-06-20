import { FiShoppingCart } from 'react-icons/fi'
import logo from '../../assets/logo.png'
import styles from './header.module.css'
import { Link } from 'react-router-dom'

export function Header(){
    const cartAmount = 1;

    return(
        <header className={styles.container}>
            <nav className={styles.navigate}>
                <Link to="/" className={styles.logo}>
                    <img src={logo} className={styles.logo__img} alt="Logo Pet Star" />
                    <p className={styles.logo__text}>Pet Star</p>
                </Link>

                <Link className={styles.cart} to={"/cart"}>
                    <FiShoppingCart size={24} color="#121212"/>
                    {cartAmount > 0 && (
                        <span className={styles.cart__amount}>
                            {cartAmount}
                        </span>
                    )}
                </Link>
            </nav>
        </header>
    )
}