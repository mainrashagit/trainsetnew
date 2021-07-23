import styles from "./index.module.sass"

interface Props {
  ol?: boolean
  alphaStyle?: boolean
}

const List: React.FC<Props> = ({ ol, alphaStyle, children }) => {
  return (
    <>
      {ol ? (
        <ol className={styles.list} data-alpha={alphaStyle}>
          {children}
        </ol>
      ) : (
        <ul className={styles.list}>{children}</ul>
      )}
    </>
  )
}

export default List
