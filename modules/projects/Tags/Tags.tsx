import styles from "./index.module.sass"
import Tag from "./Tag"
import { v4 as uuid } from "uuid"

interface Props {
  tags?: string[]
}

const Tags: React.FC<Props> = ({ tags }) => {
  return (
    <div className={styles.tags}>
      <h6 className={styles.tags__title}>Skills you will gain</h6>
      <div className={styles.tags__container}>
        {tags?.map((tag) => (
          <Tag text={tag} key={uuid()} />
        ))}
      </div>
    </div>
  )
}

export default Tags
