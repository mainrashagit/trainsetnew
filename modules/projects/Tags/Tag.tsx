import styles from "./index.module.sass"

interface Props {
  text: string
}

const Tag: React.FC<Props> = ({ text }) => {
  return <div className={styles.tag}>{text}</div>
}

export default Tag
