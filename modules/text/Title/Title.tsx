import styles from './index.module.sass'

interface Props {
  type?: "h1" | "h2" | "h6"
}

const Title: React.FC<Props> = ({ type, children }) => {
  const getTitle = (type: Props["type"]) => {
    switch (type) {
      case "h1":
        return <h1 className={styles[type]}>{children}</h1>
      case "h2":
        return <h2 className={styles[type]}>{children}</h2>
      case "h6":
        return <h6 className={styles[type]}>{children}</h6>

      default:
        return <h1 className={styles.h1}>{children}</h1>
    }
  }
  return (
    <>
      {
        getTitle(type)
      }
    </>
  )
}

export default Title