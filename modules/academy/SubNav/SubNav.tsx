import Author from "@modules/text/Author/Author"
import Link from "next/link"
import styles from "./index.module.sass"

interface Props {
  supertitle: string
  title: string
  links: {
    [link: string]: string
  }
  activeLink?: string
  author: {
    name: string
    about: string[]
    img?: string
    imgAlt?: string
  }
}

const SubNav: React.FC<Props> = ({ supertitle, title, links, activeLink, author }) => {
  return (
    <div className={styles.n}>
      <h2 className={styles.n__supertitle}>Supervised Learning{supertitle}</h2>

      <div className={styles.n__row}>
        <div className={styles.n__linksWrapper}>
          <p className={styles.n__title}>{title}</p>
          {Object.entries(links).map(([link, title], i) => (
            <Link href={`/academy/${link}`} key={`${link}-${i}`}>
              <a className={styles.n__link} data-active={link.includes(String(activeLink))}>
                {title}
              </a>
            </Link>
          ))}
        </div>
        <Author {...author} />
      </div>
    </div>
  )
}

export default SubNav
