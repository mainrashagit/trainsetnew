import styles from "./index.module.sass"
import P from "@modules/text/P/P"
import { v4 as uuid } from "uuid"

interface Props {
  img?: string
  imgAlt?: string
  name: string
  about: string[]
}

const Author: React.FC<Props> = ({ img, name, about, imgAlt }) => {
  return (
    <div className={styles.author}>
      <div className={styles.author__img}>
        <img src={img} alt={imgAlt} />
      </div>
      <div className={styles.author__column}>
        <P>
          <b>{name}</b>
        </P>
        {about.map((item) => (
          <P key={uuid()}>{item}</P>
        ))}
      </div>
    </div>
  )
}

export default Author
