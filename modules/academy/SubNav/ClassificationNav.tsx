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

const ClassificationNav: React.FC<Props> = ({ activeLink, author }) => {
    return (
        <div className={styles.n}>
            <h2 className={styles.n__title}>SUPERVISED LEARNING</h2>

            <div className={styles.n__row}>
                <div className={styles.n__linksWrapper}>
                    <p className={styles.n__link_big}>REGRESSION</p>
                    <Link href="/academy/random_forest"><a className={styles.n__link} data-active={activeLink === 0}>Random Forest</a></Link>
                    <Link href="/academy/decision_tree_id3"><a className={styles.n__link} data-active={activeLink === 1}>Decision Tree (ID3)</a></Link>
                    <Link href="/academy/logistic_regression"><a className={styles.n__link} data-active={activeLink === 2}>Logistic Regression</a></Link>
                    <Link href="/academy/naive_bayes_classifier"><a className={styles.n__link} data-active={activeLink === 3}>Naive Bayes Classifier</a></Link>
                    <Link href="#"><a className={styles.n__link} data-active={activeLink === 4}>Decision Tree (CART)</a></Link>
                    <Link href="#"><a className={styles.n__link} data-active={activeLink === 5}>Linear SVMs</a></Link>
                    <Link href="#"><a className={styles.n__link} data-active={activeLink === 6}>Kernelized SVMs</a></Link>
                    <Link href="#"><a className={styles.n__link} data-active={activeLink === 7}>Convulational Neural Nets</a></Link>
                    <Link href="#"><a className={styles.n__link} data-active={activeLink === 8}>Gradient Boosted Machines</a></Link>
                </div>
                <Author {...author}/>
            </div>
        </div>
    )
}

export default ClassificationNav