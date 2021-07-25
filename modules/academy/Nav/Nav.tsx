import Link from 'next/link'
import styles from './index.module.sass'

interface Props { }

const Nav: React.FC<Props> = ({ }) => {
    return (
        <div className={styles.tableOfContent}>
            <h5 className={styles.tableOfContent__title}>MACHINE LEARNING</h5>

            <div className={styles.tableOfContent__wrapper}>
                <div className={styles.navigationDocs}>
                    <h6 className={styles.navigationDocs__title}>SUPERVISED LEARNING</h6>
                    <div className={styles.navigationDocs__column}>
                        <p className={styles.navigationDocs__suptitle}>REGRESSION</p>

                        <Link href="/academy/lasso_ridge_elastic_net"><a className={styles.navigationDocs__link}>Lasso, Ridge &amp; Elastic Net</a></Link>
                        <Link href="#"><a className={styles.navigationDocs__link}>Linear Regression</a></Link>
                        <Link href="#"><a className={styles.navigationDocs__link}>KNN Regression</a></Link>
                        <Link href="#"><a className={styles.navigationDocs__link}>Multivariate Regression</a></Link>
                        <Link href="#"><a className={styles.navigationDocs__link}>Neural Network Regressor</a></Link>
                        <Link href="#"><a className={styles.navigationDocs__link}>Polynomial Regression</a></Link>
                    </div>

                    <div className={styles.navigationDocs__column}>
                        <p className={styles.navigationDocs__suptitle}>CLASSIFICATION</p>

                        <Link href="/academy/random_forest"><a className={styles.navigationDocs__link}>Random Forest</a></Link>
                        <Link href="/academy/decision_tree_id3"><a className={styles.navigationDocs__link}>Decision Tree (ID3)</a></Link>
                        <Link href="/academy/logistic_regression"><a className={styles.navigationDocs__link}>Logistic Regression</a></Link>
                        <Link href="/academy/naive_bayes_classifier"><a className={styles.navigationDocs__link}>Naive Bayes Classifier</a></Link>
                        <Link href="#"><a className={styles.navigationDocs__link}>Decision Tree (CART)</a></Link>
                        <Link href="#"><a className={styles.navigationDocs__link}>Linear SVMs </a></Link>
                        <Link href="#"><a className={styles.navigationDocs__link}>Kernelized SVMs</a></Link>
                        <Link href="#"><a className={styles.navigationDocs__link}>Convulational Neural Nets </a></Link>
                        <Link href="#"><a className={styles.navigationDocs__link}>Gradient Boosted Machines</a></Link>
                    </div>
                </div>

                <div className={styles.navigationDocs}>
                    <h6 className={styles.navigationDocs__title}>UNSUPERVISED LEARNING</h6>
                    <div className={styles.navigationDocs__column}>
                        <p className={styles.navigationDocs__suptitle}>CLUSTERING</p>
                        <Link href="/academy/k_means"><a className={styles.navigationDocs__link}>K-Means</a></Link>
                        <Link href="#"><a className={styles.navigationDocs__link}>K-Medians</a></Link>
                        <Link href="#"><a className={styles.navigationDocs__link}>K-Medoids</a></Link>
                        <Link href="#"><a className={styles.navigationDocs__link}>Fuzzy C-Means </a></Link>
                        <Link href="#"><a className={styles.navigationDocs__link}>Hierarchial Clustering</a></Link>
                    </div>

                    <div className={styles.navigationDocs__column}>
                        <p className={styles.navigationDocs__suptitle}>GENERATION</p>

                        <Link href="#"><a className={styles.navigationDocs__link}>Hidden Markov Models</a></Link>
                        <Link href="#"><a className={styles.navigationDocs__link}>Recurrent Neural Nets</a></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav