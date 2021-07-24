import { HTMLProps } from "react"
import styles from "./index.module.sass"

interface Props extends HTMLProps<HTMLParagraphElement> {}

const P: React.FC<Props> = ({ children, ...props }) => {
  return <p className={styles.p} {...props}>{children}</p>
}

export default P
