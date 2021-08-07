import styles from "./index.module.sass"
import Link from "next/link"

interface Props {
  text: string
  active?: boolean
  link: string
}

const SidebarItem: React.FC<Props> = ({ text, active, link }) => {
  return (
    <Link href={`/blog/${link}`}>
      <a
        className={styles.link}
        data-active={active}
      >
        {text}
      </a>
    </Link>
  )
}

export default SidebarItem
