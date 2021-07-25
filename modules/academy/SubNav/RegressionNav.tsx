import Author from '@modules/text/Author/Author'
import Link from 'next/link'
import styles from './index.module.sass'

interface Props { 
    activeLink?: number
    author: {
        name: string
        about: string[]
        img: string
    }
}

const RegressionNav: React.FC<Props> = ({ activeLink, author }) => {
    return (
        <div className={styles.n}>
            <h2 className={styles.n__title}>SUPERVISED LEARNING</h2>

            <div className={styles.n__row}>
                <div className={styles.n__linksWrapper}>
                    <p className={styles.n__link_big}>REGRESSION</p>
                    <Link href="#"><a className={styles.n__link} data-active={activeLink === 0}>Lasso, Ridge &amp; Elastic Net</a></Link>
                    <Link href="#"><a className={styles.n__link} data-active={activeLink === 1}>Linear Regression</a></Link>
                    <Link href="#"><a className={styles.n__link} data-active={activeLink === 2}>KNN Regression</a></Link>
                    <Link href="#"><a className={styles.n__link} data-active={activeLink === 3}>Multivariate Regression</a></Link>
                    <Link href="#"><a className={styles.n__link} data-active={activeLink === 4}>Neural Network Regressor</a></Link>
                    <Link href="#"><a className={styles.n__link} data-active={activeLink === 5}>Polynomial Regression</a></Link>
                </div>
                <Author {...author}/>
            </div>
        </div>
    )
}

export default RegressionNav