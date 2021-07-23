import styles from "./index.module.sass"

interface Props {
  text: string
}

const Checkbox: React.FC<Props> = ({ text }) => {
  return (
    <label className={styles.label}>
      <input className={styles.input} type="checkbox" />
      <span className={styles.icon}></span>
      <span className={styles.text}>{text}</span>
    </label>
  )
}

export default Checkbox
