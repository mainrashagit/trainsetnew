import styles from "./layout.module.sass"
import CustomHead from "@modules/CustomHead/CustomHead"
import Link from "next/link"
import ResponsiveHeader from "@modules/ResponsiveHeader/ResponsiveHeader"
import { useEffect, useState } from "react"
import { ILayout } from "@/pages/api/layout"
import { useRouter } from "next/dist/client/router"
import { server } from "@/config"

interface Props {}

const Layout: React.FC<Props> = ({ children }) => {
  const [options, setOptions] = useState<ILayout>()
  const [loggedIn, setLoggedIn] = useState(false)
  const router = useRouter()
  useEffect(() => {
    const headerBurgerMenu = new ResponsiveHeader(styles.header, styles.burgerIcon, styles.header__active, styles.burgerIcon__active)
    ;(async () => {
      // const res = await fetch(`${server}/api/layout`)
      // const content = (await res.json()) as ILayout
      // setOptions(content)
    })()
    return () => {
      headerBurgerMenu.unmount()
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      // const res = await fetch(`${server}/api/isLoggedIn`, {
      //   method: "POST",
      //   credentials: "include",
      // })
      // const { success } = await res.json()
      // if (success) return setLoggedIn(true)
      // setLoggedIn(false)
    })()
    return () => {}
  }, [router.route])

  const logOut = async () => {
    const res = await fetch(`${server}/api/logOut`, {
      method: "POST",
    })
    const { success } = await res.json()
    if (success) {
      setLoggedIn(false)
      router.push("/")
    }
  }
  const Logo = () => (
    <Link href="/">
      <a className={styles.header__logo}>
        <img srcSet={options?.header?.logo?.srcSet ?? ""} src={options?.header?.logo?.sourceUrl ?? ""} alt={options?.header?.logo?.altText ?? ""} />
      </a>
    </Link>
  )
  return (
    <>
      <CustomHead />
      <div className={styles.wrapper}>
        <div className={styles.responsiveHeader}>
          <Logo />
          <div className={styles.burgerIcon}>
            <span></span>
          </div>
        </div>

        <header className={styles.header}>
          <div className={styles.header__container}>
            <Logo />

            <nav className={styles.header__navigation}>
              {options?.header.nav?.map(({ link, text }, i) => (
                <Link href={link} key={`nav-top-${i}`}>
                  <a className={styles.link}>{text}</a>
                </Link>
              ))}
            </nav>

            <div className={styles.header__authorization}>
              {loggedIn ? (
                <a className={styles.link_border} onClick={logOut}>
                  Sign out
                </a>
              ) : (
                <Link href="/auth/sign-in">
                  <a className={styles.link_border}>Sign in</a>
                </Link>
              )}

              <Link href="/auth/sign-up">
                <a className={styles.link_border}>Get Started</a>
              </Link>
            </div>
          </div>
        </header>

        <main className={styles.container}>{children}</main>
        <footer className={styles.footer}>
          <div className={styles.footer__wrapper}>
            <div className={styles.footer__row}>
              {options?.footer?.nav?.map(({ text, link }, i) => (
                <Link href={link} key={`nav-bottom-${i}`}>
                  <a className={styles.footer__link}>{text}</a>
                </Link>
              ))}
            </div>

            <div className={styles.footer__row}>
              {options?.footer?.soc?.map(({ link, image }, i) => (
                <a href={link} className={styles.footer__socialMedia} target="_blank" key={`nav-bottom-social-${i}`}>
                  <img srcSet={image?.srcSet ?? ""} alt={image?.altText ?? ""} src={image?.sourceUrl ?? ""} />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Layout
