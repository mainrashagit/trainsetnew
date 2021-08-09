import styles from "./index.module.sass"
import Card from "@modules/Card/Card"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/dist/client/router"
import { User } from "../api/user"

interface Props {}

const UserPage: React.FC<Props> = ({}) => {
  const router = useRouter()
  const [username, setUsername] = useState<string>()
  const [ava, setAva] = useState<string>()
  useEffect(() => {
    ;(async () => {
      const res = await fetch("/api/user", {
        method: "POST",
        credentials: "include",
      })
      const json = await res.json() as User
      if ("success" in json && json.success === false) return router.push("/auth/sign-in")
      if (!("username" in json)) throw new Error("no username")
      setUsername(json?.username)
      setAva(json?.avatar?.url)
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
            <p className={styles.info__pos}>Free Member</p>
          </div>
          <div className={styles.info__img}>
            <img src={ava} alt="avatar of profile" />
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
