import styles from './index.module.sass'

interface Props {}

const SectionTitle: React.FC<Props> = ({children}) => {
    return (
        <h6 className={styles.title}>
            {children}
        </h6>
    )
}

export default SectionTitle