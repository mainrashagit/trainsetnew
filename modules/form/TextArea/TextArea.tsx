import { HTMLProps } from "react"
import styles from "./index.module.sass"

interface Props extends HTMLProps<HTMLTextAreaElement> {}

const TextArea: React.FC<Props> = ({...props}) => {
  return (
    <textarea className={styles.ta} {...props} />
  )
}

export default TextArea
