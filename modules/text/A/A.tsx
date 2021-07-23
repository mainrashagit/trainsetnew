import styles from "./index.module.sass"
import Link from "next/link"
import { HTMLProps } from "react"

interface Props extends HTMLProps<HTMLAnchorElement> {
  link?: string
  to: string
}

const A: React.FC<Props> = ({ link, to, children, ...props }) => {
  return (
    <>
      {link ? (
        <Link href={link}>
          <a className={styles.a} {...props}>{children}</a>
        </Link>
      ) : (
        <a className={styles.a} href={to} {...props}>{children}</a>
      )}
    </>
  )
}

export default A
