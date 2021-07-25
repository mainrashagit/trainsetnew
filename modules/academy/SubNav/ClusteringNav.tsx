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

const ClusteringNav: React.FC<Props> = ({ activeLink, author }) => {
    return (
        <div className={styles.n}>
            <h2 className={styles.n__title}>SUPERVISED LEARNING</h2>

            <div className={styles.n__row}>
                <div className={styles.n__linksWrapper}>
                    <p className={styles.n__link_big}>REGRESSION</p>
                    <Link href="/academy/k_means"><a className={styles.n__link} data-active={activeLink === 0}>K-Means</a></Link>
                    <Link href="#"><a className={styles.n__link} data-active={activeLink === 1}>K-Medians</a></Link>
                    <Link href="#"><a className={styles.n__link} data-active={activeLink === 2}>K-Medoids</a></Link>
                    <Link href="#"><a className={styles.n__link} data-active={activeLink === 3}>Fuzzy C-Means</a></Link>
                    <Link href="#"><a className={styles.n__link} data-active={activeLink === 4}>Hierarchial Clustering</a></Link>
                </div>
                <Author {...author} />
            </div>
        </div>
    )
}

export default ClusteringNav