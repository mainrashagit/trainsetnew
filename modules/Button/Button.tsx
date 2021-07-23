import styles from "./index.module.sass"

interface Props {
    type?: "button" | "inset" | "link" | "hollow"
}

const Button: React.FC<Props> = ({ type, children }) => {
  return <div className={type ? styles[type] : styles.button}>{children}</div>
}

export default Button
