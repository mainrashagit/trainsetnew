import { User } from "@/pages/api/isLoggedIn"
import { useRouter } from "next/dist/client/router"
import { useEffect, useState } from "react"
import styles from "./index.module.sass"

interface Props {}

const Start: React.FC<Props> = ({}) => {
  const router = useRouter()
  const [user, setUser] = useState("")
  const { level, project } = router.query
  useEffect(() => {
    ;(async () => {
      const res = await fetch("/api/isLoggedIn")
      const { content } = (await res.json()) as { jazz: string; content: User }
      if ("success" in content) return router.push("/auth/sign-in")
      if (Number(level) !== 0 && content.role !== "paid_subscriber") return router.push("/purchase")
      setUser(content.username)
    })()
    return () => {}
  }, [])
  return <>{user && <iframe className={styles.jupyter} src={`https://jupyterhub.trainset.ai/hub/user/${user}/notebooks/notebooks/${project}.ipynb`}></iframe>}</>
}

export default Start
