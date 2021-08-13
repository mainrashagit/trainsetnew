import { User } from "@/pages/api/isLoggedIn"
import { useRouter } from "next/dist/client/router"
import { useEffect, useState } from "react"
import styles from "./index.module.sass"

interface Props {}

const Start: React.FC<Props> = ({}) => {
  const router = useRouter()
  const [user, setUser] = useState("")
  useEffect(() => {
    console.log(router.query)
    ;(async () => {
      const res = await fetch("/api/isLoggedIn")
      const json = await res.json() as User
      if ("success" in json) return router.push("/auth/sign-in")
      if (json.role !== "paid_subscriber") return router.push("/purchase")
      setUser(json.username)
    })()
    // function hideMenuBar() {
    //   const menubar = document.getElementById("menubar")
    //   if (!(menubar instanceof HTMLElement)) return setTimeout(hideMenuBar, 1000)
    //   menubar.style.display = "hide!important"
    // }
    // hideMenuBar()
    return () => {}
  }, [])
  return <>{user && <iframe className={styles.jupyter} src={`https://jupyterhub.trainset.ai/hub/user/${user}/notebooks/notebooks/tlm_project1.ipynb`}></iframe>}</>
}

export default Start
