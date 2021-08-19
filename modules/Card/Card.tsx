import styles from "./index.module.sass"
import Link from "next/link"
import Button from "@modules/Button/Button"
import { HTMLProps, useState } from "react"
import { useRouter } from "next/dist/client/router"
import { getJazz } from "@modules/token"

interface Props {
  level: string
  showLevel?: boolean
  title: string
  about: string
  link: string
  buttons?: boolean
  src: string
  srcSet?: string
  imgAlt?: string
  more?: boolean
}

const Card: React.FC<Props & HTMLProps<HTMLDivElement>> = ({ level, showLevel, title, about, link, buttons, src, srcSet, imgAlt, more, ...props }) => {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const mark = async () => {
    setMessage("...")
    const userRes = await fetch("/api/user", {
      method: "POST",
      credentials: "include",
    })
    const user = await userRes.json()
    if (!("content" in user)) router.push("/auth/sing-in")
    const res1 = await fetch("/api/mark", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        jazz: getJazz(),
        id: user?.content?.id,
        proj: link
      }),
    })
    const { content } = await res1.json()
    if ("success" in content) return router.push("/auth/sign-in")
    if (Array.isArray(content)) setMessage("Project marked!")
  }
  return (
    <div className={styles.card}>
      <div className={styles.card__wrapper} {...props}>
        <div className={styles.card__column}>
          {showLevel && <span className={styles.card__level}>{level}</span>}
          <div className={styles.card__image}>
            <img className={styles.card__image_src} src={src} srcSet={srcSet} alt={imgAlt} />
          </div>
        </div>

        <div className={styles.card__column_big}>
          <h6 className={styles.card__title}>{title}</h6>

          <p className={styles.card__suptitle}>About this course</p>

          <p className={styles.card__text} dangerouslySetInnerHTML={{ __html: about }}></p>

          {more && (
            <div className={styles.card__buttonLink}>
              <Link href={`/projects/${link}`}>
                <a>
                  <Button type={"link"}>more</Button>
                </a>
              </Link>
            </div>
          )}
        </div>
        {buttons && (
          <>
            <div className={styles.card__buttonWrapper} onClick={mark}>
              <Button type={"inset"}>{message.length > 0 ? message : "Mark for later"}</Button>
            </div>
            <div className={styles.card__buttonWrapper}>
              <Link href={`/projects/start?level=${level.slice(-1)}&project=${link}`}>
                <a>
                  <Button type={"inset"}>Start a project</Button>
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
