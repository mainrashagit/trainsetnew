import styles from "./index.module.sass"
import Card from "@modules/Card/Card"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/dist/client/router"
import { User } from "../api/user"
import { getJazz, setJazz } from "@modules/token"
import { WP_Image } from "@/api/api"

interface Props {}

const UserPage: React.FC<Props> = ({}) => {
  const router = useRouter()
  const [username, setUsername] = useState<string>()
  const [ava, setAva] = useState<string>()
  const [membership, setMembership] = useState<string>("")
  const [img, setImg] = useState<WP_Image>()
  useEffect(() => {
    ;(async () => {
      const res = await fetch("/api/user", {
        method: "POST",
        credentials: "include",
        body: getJazz(),
      })
      const json = (await res.json()) as {
        jazz: string
        content: User
      }
      const {jazz, content} = json
      if (typeof jazz === "string" && jazz?.length > 0) setJazz(jazz)
      if ("success" in content && content.success === false) return router.push("/auth/sign-in")
      if (!("username" in content)) throw new Error("no username")
      setUsername(content?.username)
      setAva(content?.avatar?.url)
      setMembership(content?.role.replace("_", " "))
      const picRes = await fetch("/api/profilePage")
      const pic = await picRes.json()
      setImg(pic)
    })()
    return () => {}
  }, [])
  return (
    <div className={styles.user}>
      <div className={styles.pannel}>
        {/* <div className={styles.pannel__buttons}>
          <p className={styles.pannel__button}>In-Progress</p>
          <p className={styles.pannel__button} data-active={true}>Started</p>
        </div> */}

        <div className={styles.info}>
          <div className={styles.info__column}>
            <p className={styles.info__name}>{username}</p>
            <p className={styles.info__pos}>{membership}</p>
            {!membership.includes("aid") && <Link href="/purchase"><a className={styles.info__upgrade}><b>Upgrade</b></a></Link>}
          </div>
          <div className={styles.info__img}>
            <img src={img?.sourceUrl ?? ""} srcSet={img?.srcSet ?? ""} alt={img?.altText ?? "profile image"} />
          </div>
        </div>

        <div className={styles.started}>
          <Link href={"#"}>
            <a className={styles.link}></a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserPage
