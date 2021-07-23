import styles from "./index.module.sass"

interface Props {}

const PageTitle: React.FC<Props> = ({ children }) => {
  return <h5 className={styles.title}>{children}</h5>
}

export default PageTitle
