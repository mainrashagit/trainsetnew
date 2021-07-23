import styles from './index.module.sass'
import Link from "next/link"

interface Props { }

const ArrowTop: React.FC<Props> = ({ }) => {

    return (
        <div className={styles.wrapper}>
            <a className={styles.arrow} onClick={(e) => {window.scrollTo({top: 0, behavior: "smooth"})}}> up </a>
        </div>
    )
}

export default ArrowTop