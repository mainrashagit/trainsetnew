import styles from './index.module.sass'

interface Props {}

const MinorTitle: React.FC<Props> = ({children}) => {
    return (
        <h6 className={styles.title}>{children}</h6>
    )
}

export default MinorTitle