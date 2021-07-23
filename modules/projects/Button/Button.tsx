import styles from "./index.module.sass"

interface Props {}

const Button: React.FC<Props> = ({ children }) => {
  return <div className={styles.button}>{children}</div>
}

export default Button
