import styles from "./index.module.sass"
import Link from "next/link"
import Button from "@modules/Button/Button"

interface Props {
  level?: string
  title: string
  about: string
  link: string
  buttons?: boolean
  img: string
  imgAlt?: string
  more?: boolean
}

const Card: React.FC<Props> = ({
  level,
  title,
  about,
  link,
  buttons,
  img,
  imgAlt,
  more
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__wrapper}>
        <div className={styles.card__column}>
          {level && <span className={styles.card__level}>{level}</span>}
          <div className={styles.card__image}>
            <img className={styles.card__image_src} src={img} alt={imgAlt} />
          </div>
        </div>

        <div className={styles.card__column_big}>
          <h6 className={styles.card__title}>{title}</h6>

          <p className={styles.card__suptitle}>About this course</p>

          <p className={styles.card__text} dangerouslySetInnerHTML={{__html: about}}></p>

          {more && <div className={styles.card__buttonLink}>
            <Link href={`/projects/${link}`}>
              <a>
                <Button type={"link"}>
                  more
                </Button>
              </a>
            </Link>
          </div>}
        </div>
        {buttons && (
          <>
            <div className={styles.card__buttonWrapper}>
              <Link href={`/projects/${link}/mark-for-later`}>
                <a>
                  <Button type={"inset"}>
                    Mark for later
                  </Button>
                </a>
              </Link>
            </div>
            <div className={styles.card__buttonWrapper}>
              <Link href={`/projects/${link}/start`}>
                <a>
                  <Button type={"inset"}>
                    Start a project
                  </Button>
                </a>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Card
