import styles from "./index.module.sass"
import Card from "@modules/Card/Card"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/dist/client/router"
import { User } from "../api/user"
import { getJazz, setJazz } from "@modules/token"
import { WP_Image } from "@/api/api"
import { ProjectsPreview } from "../api/projectsPreview"
import { v4 as uuid } from "uuid"

interface Props {}

const UserPage: React.FC<Props> = ({}) => {
  const router = useRouter()
  const [username, setUsername] = useState<string>()
  const [ava, setAva] = useState<string>()
  const [membership, setMembership] = useState<string>("")
  const [img, setImg] = useState<WP_Image>()
  const [projects, setProjects] = useState<ProjectsPreview>()
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
      const { jazz, content } = json
      if (typeof jazz === "string" && jazz?.length > 0) setJazz(jazz)
      if ("success" in content && content.success === false) return router.push("/auth/sign-in")
      if (!("username" in content)) throw new Error("no username")
      setUsername(content?.username)
      setAva(content?.avatar?.url)
      setMembership(content?.role.replace("_", " "))
      const picRes = await fetch("/api/profilePage")
      const pic = await picRes.json()
      setImg(pic)

      const markedProjectsRes = await fetch("/api/mark", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          jazz: getJazz(),
          id: content.id,
        }),
      })
      const { content: markedProjects } = await markedProjectsRes.json()

      if (markedProjects.length <= 0) return
      const projectsPreviewRes = await fetch("/api/projectsPreview")
      const projectsPreview = await projectsPreviewRes.json()
      const projects = projectsPreview.filter((p: any) => markedProjects.some((j: string) => p.link === j))
      setProjects(projects)
    })()
    return () => {}
  }, [])
  return (
    <div className={styles.user}>
      <div className={styles.pannel}>
        <div className={styles.info}>
          <div className={styles.info__column}>
            <p className={styles.info__name}>{username}</p>
            <p className={styles.info__pos}>{membership}</p>
            {!membership.includes("aid") && (
              <Link href="/purchase">
                <a className={styles.info__upgrade}>
                  <b>Upgrade</b>
                </a>
              </Link>
            )}
          </div>
          <div className={styles.info__img}>
            <img src={img?.sourceUrl ?? ""} srcSet={img?.srcSet ?? ""} alt={img?.altText ?? "profile image"} />
          </div>
        </div>

        {projects && projects?.length > 0 && (
          <>
            <div className={styles.pannel__buttons}>
              {/* <p className={styles.pannel__button}>In-Progress</p> */}
              <p className={styles.pannel__button} data-active={true}>
                Starred
              </p>
            </div>

            <div className={styles.started}>
              {projects?.map(({ link, brief, image, title, level }) => (
                <div className={styles.proj} key={uuid()}>
                  <Link href={`/projects/start?level=${level.slice(-1)}&project=${link}`}>
                    <a className={styles.link}>
                      <Card level={level} title={title} about={brief.split("\n")[0]} link={link} src={image?.sourceUrl ?? ""} imgAlt={image?.altText ?? ""} srcSet={image?.srcSet ?? ""} buttons={false} more={false} style={{ width: "100%", maxWidth: "920px" }} showLevel={true} />
                    </a>
                  </Link>
                  <div
                    className={styles.bucketWrap}
                    onClick={async () => {
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
                          kill: true,
                        }),
                      })
                      const { content: markedProjects } = await res1.json()
                      if ("success" in markedProjects) return router.push("/auth/sign-in")
                
                      if (markedProjects.length <= 0) return
                      const projectsPreviewRes = await fetch("/api/projectsPreview")
                      const projectsPreview = await projectsPreviewRes.json()
                      const projects = projectsPreview.filter((p: any) => markedProjects.some((j: string) => p.link === j))
                      setProjects(projects)
                    }}
                  >
                    <img src="/iconsSprite/bucket.svg" className={styles.bucket} alt="" />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default UserPage
