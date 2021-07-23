import { HTMLProps } from "react"
import styles from "./index.module.sass"

interface Props extends HTMLProps<HTMLInputElement> {}

const Input: React.FC<Props> = ({ ...props }) => {
  return (
    <input type={props.type ?? "text"} className={styles.input} {...props} />
  )
}

export default Input
