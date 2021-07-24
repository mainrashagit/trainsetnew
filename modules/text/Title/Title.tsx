import styles from './index.module.sass'

interface Props {
  type?: "h1" | "h2" | "h6"
  margin?: boolean
}

const Title: React.FC<Props> = ({ type, children, margin }) => {
  const getTitle = (type: Props["type"]) => {
    switch (type) {
      case "h1":
        return <h1 className={`${styles[type]}${margin ? " " + styles.m : ""}`}>{children}</h1>
      case "h2":
        return <h2 className={`${styles[type]}${margin ? " " + styles.m : ""}`}>{children}</h2>
      case "h6":
        return <h6 className={`${styles[type]}${margin ? " " + styles.m : ""}`}>{children}</h6>

      default:
        return <h1 className={`${styles.h1}${margin ? " " + styles.m : ""}`}>{children}</h1>
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