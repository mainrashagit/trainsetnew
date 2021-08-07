import styles from "./index.module.sass"
import Title from "@modules/text/PageTitle/PageTitle"
import Button from "@modules/projects/Button/Button"
import Link from "next/link"
import Tags from "../Tags/Tags"

interface Props {
  title: string
  link: string
  src: string
  srcSet?: string
  imgAlt?: string
  tags: string[]
}

const Card: React.FC<Props> = ({ title, link, src, srcSet, imgAlt, tags }) => {
  return (
    <div className={styles.card}>
      <div className={styles.img}>
        <div className={styles.imgWrap}>
          <img className={styles.imgSrc} src={src} srcSet={srcSet} alt={imgAlt} />
        </div>
      </div>
      <div className={styles.info}>
        <Title>{title}</Title>

        <div className={styles.info__buttons}>
          <Button>
            <Link href={`/projects/${link}/start`}>
              <a>Start Project</a>
            </Link>
          </Button>
          <Button>
            <Link href={`/projects/${link}/mark-for-later`}>
              <a>Mark for Later</a>
            </Link>
          </Button>
        </div>
        <Tags tags={tags} />
      </div>
    </div>
  )
}

export default Card
