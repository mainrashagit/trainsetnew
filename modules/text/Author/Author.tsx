import styles from "./index.module.sass"
import P from "@modules/text/P/P"
import { v4 as uuid } from "uuid"

export interface AuthorProps {
  src?: string
  srcSet?: string
  imgAlt?: string
  name: string
  about: string
}

const Author: React.FC<AuthorProps> = ({ src, srcSet, name, about, imgAlt }) => {
  return (
    <div className={styles.author}>
      <div className={styles.author__img}>
        <img srcSet={srcSet} src={src} alt={imgAlt} />
      </div>
      <div className={styles.author__column}>
        <P>
          <b>{name}</b>
        </P>
        <div dangerouslySetInnerHTML={{__html: about}}></div>
      </div>
    </div>
  )
}

export default Author
