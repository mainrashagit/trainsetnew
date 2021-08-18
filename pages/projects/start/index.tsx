import { User } from "@/pages/api/isLoggedIn"
import { useRouter } from "next/dist/client/router"
import { useEffect, useState } from "react"
import styles from "./index.module.sass"

interface Props {}

const Start: React.FC<Props> = ({}) => {
  const router = useRouter()
  const [user, setUser] = useState("")
  const [token, setToken] = useState("")
  const [project, setProject] = useState("")
  useEffect(() => {
    if (!("level" in router.query) || !("project" in router.query)) return
    const { level, project } = router.query
    if (typeof project === "string") setProject(project ?? "")
    ;(async () => {
      const res = await fetch("/api/isLoggedIn")
      const { content } = (await res.json()) as { jazz: string; content: User }
      if ("success" in content) return router.push("/auth/sign-in")
      if (Number(level) !== 0 && content.role !== "paid_subscriber") return router.push("/purchase")
      setUser(content.username)
      setToken(content.token)
    })()
    return () => {}
  }, [router.query])
  return <>{user?.length > 0 && token?.length > 0 && <iframe className={styles.jupyter} src={`https://jupyterhub.trainset.ai/hub/login?token=${token}&next=https://jupyterhub.trainset.ai/hub/user/${user}/notebooks/notebooks/${project}.ipynb?token=${token}`}></iframe>}</>
}

export default Start
