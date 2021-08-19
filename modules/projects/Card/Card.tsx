import styles from "./index.module.sass"
import Title from "@modules/text/PageTitle/PageTitle"
import Button from "@modules/projects/Button/Button"
import Link from "next/link"
import Tags from "../Tags/Tags"
import { useState } from "react"
import { useRouter } from "next/dist/client/router"
import { getJazz } from "@modules/token"

interface Props {
  title?: string
  link?: string
  src?: string
  srcSet?: string
  imgAlt?: string
  tags?: string[]
  level: string
}

const Card: React.FC<Props> = ({ title, link, src, srcSet, imgAlt, tags, level }) => {
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
        proj: link,
      }),
    })
    const { content } = await res1.json()
    if ("success" in content) return router.push("/auth/sign-in")
    if (Array.isArray(content)) setMessage("Project marked!")
  }
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
            <Link href={`/projects/start?level=${level.slice(-1)}&project=${link}`}>
              <a>Start Project</a>
            </Link>
          </Button>
          <div onClick={mark}>
            <Button>{message.length > 0 ? message : "Mark for Later"}</Button>
          </div>
        </div>
        <Tags tags={tags} />
      </div>
    </div>
  )
}

export default Card
