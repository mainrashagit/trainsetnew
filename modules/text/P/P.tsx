import styles from "./index.module.sass"

interface Props {}

const P: React.FC<Props> = ({ children }) => {
  return <p className={styles.p}>{children}</p>
}

export default P
