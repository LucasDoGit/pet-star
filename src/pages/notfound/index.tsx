import { Link } from 'react-router-dom'
import styles from './notfound.module.css'

export function NotFound(){
    return(
        <div className={styles.container}>
            <section className={styles.notfound}>
                <h1 className={styles.title}>Erro 404!</h1>
                <p className={styles.text}>Ops... essa página não existe!</p>
                <Link to={'/'} className={styles.btn_voltar}>Voltar a Home</Link>
            </section>
        </div>
    )
}