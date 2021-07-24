import styles from './index.module.sass'

interface Props { }

const Container: React.FC<Props> = ({ children }) => {
    return (
        <div className={styles.c}>
            {children}
        </div>
    )
}

export default Container