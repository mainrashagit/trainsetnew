import styles from "./layout.module.sass"
import CustomHead from "@modules/CustomHead/CustomHead"
import Link from "next/link"
import ResponsiveHeader from "@modules/ResponsiveHeader/ResponsiveHeader"
import { useEffect } from "react"

interface Props { }

const Layout: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    const headerBurgerMenu = new ResponsiveHeader(
      styles.header,
      styles.burgerIcon,
      styles.header__active,
      styles.burgerIcon__active
    )
    return () => {
      headerBurgerMenu.unmount()
    }
  }, [])
  return (
    <>
      <CustomHead />
      <div className={styles.wrapper}>
        <div className={styles.responsiveHeader}>
          <Link href="/">
            <a className={styles.header__logo}>
              <img src="/images/logotype.svg" alt="логотип Train Set" />
            </a>
          </Link>

          <div className={styles.burgerIcon}>
            <span></span>
          </div>
        </div>

        <header className={styles.header}>
          <div className={styles.header__container}>

            <Link href="/">
              <a className={styles.header__logo}>
                <img src="/images/logotype.svg" alt="логотип Train Set" />
              </a>
            </Link>

            <nav className={styles.header__navigation}>
              <Link href="/academy">
                <a className={styles.link}>Academy</a>
              </Link>
              <Link href="/projects">
                <a className={styles.link_animatedBG}>Projeсts</a>
              </Link>
              <Link href="/contact">
                <a className={styles.link}>Contact</a>
              </Link>
              <Link href="/blog/cross_validation">
                <a className={styles.link}>Blog</a>
              </Link>
            </nav>

            <div className={styles.header__authorization}>
              <Link href="/auth/sign_in">
                <a className={styles.link_border}>Sign in</a>
              </Link>

              <Link href="/auth/sign_up">
                <a className={styles.link_border}>
                  Get Started
                </a>
              </Link>
            </div>
          </div>
        </header>

        <main className={styles.container}>{children}</main>
        <footer className={styles.footer}>
          <div className={styles.footer__wrapper}>
            <div className={styles.footer__row}>
              <Link href="/">
                <a className={styles.footer__link}>
                  Home
                </a>
              </Link>
              <Link href="/blog/cross_validation/">
                <a className={styles.footer__link}>
                  Blog
                </a>
              </Link>
              <Link href="/contact">
                <a className={styles.footer__link}>
                  Contact
                </a>
              </Link>
            </div>

            <div className={styles.footer__row}>
              <a
                href="https://www.facebook.com/thelearningm"
                className={styles.footer__socialMedia}
                target="_blank"
              >
                <img src="/iconsSprite/facebook-icon.svg" alt="facebook" />
              </a>
              <a
                href="https://www.instagram.com/thelearningm"
                target="_blank"
                className={styles.footer__socialMedia}
              >
                <img src="/iconsSprite/instagram-icon.svg" alt="instagram" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Layout
