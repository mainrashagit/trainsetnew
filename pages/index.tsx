import styles from "./index.module.sass"
import Title from "@modules/text/Title/Title"
import Card from "@modules/Card/Card"
import Button from "@modules/Button/Button"
import Link from "next/link"
import { GetStaticProps } from "next"
import { getMainPage, MainPage } from "@/api/api"
import { Fragment, useEffect, useState } from "react"
import { ProjectsPreview } from "@/pages/api/projectsPreview"
import useSWR from "swr"

interface Props {
  page: MainPage
}

export default function Home(/* { page: { screen1, screen2, screen3, screen4, screen5, screen6, screen7 } }: Props */) {

  const getTwoRandomProjects = (projects: any[]) => {
    const set = new Set<number>()
    while (set.size < 2) {
      set.add(Math.floor(Math.random() * projects.length))
    }
    const nums = [...set]
    return [projects[nums[0]], projects[nums[1]]]
  }
  const { data: projects, error } = useSWR<ProjectsPreview>("/api/projectsPreview", (url) => fetch(url).then(r => r.json()))
  const cards = projects ? getTwoRandomProjects(projects).map(({ link, level, brief, image, title }, i) => <Card about={brief} level={level} src={image?.sourceUrl} srcSet={image?.srcSet} link={link} title={title} key={`${link}-preview-${i}`} more={true} />) : ""

  useEffect(() => {
    return () => {}
  }, [])
  return (
    <>
      <section className={styles.firstScreen}>
        <div>Test</div>
        {/* <div className={styles.firstScreen__wrapper}>
          <div className={styles.firstScreen__column}>
            <div className={styles.firstScreen__title}>
              <Title type="h1">{screen1?.title}</Title>
            </div>
            <h5 className={styles.firstScreen__suptitle}>{screen1?.subtitle}</h5>
            <Link href={screen1?.button.link}>
              <a className={styles.firstScreen__topbutton}>{screen1?.button.text}</a>
            </Link>
          </div>

          <div className={styles.firstScreen__image}>
            <img srcSet={screen1?.image?.srcSet ?? ""} src={screen1?.image?.sourceUrl ?? ""} alt={screen1?.image?.altText ?? ""} />
          </div>
        </div>
      </section>

      <div className={styles.firstScreen__title} style={{ marginTop: 0, maxWidth: "auto" }}>
        <Title type="h2">How does TrainSet Work?</Title>
      </div>
      <h5 className={styles.firstScreen__suptitle} dangerouslySetInnerHTML={{ __html: screen2?.subtitle }}></h5>

      <section className={styles.projects}>
        <div className={styles.projects__wrapper}>
          <div className={styles.projects__title}>
            <Title type="h2">{screen3?.title}</Title>
          </div>
          <div className={styles.projects__row}>{cards}</div>

          <div className={styles.projects__button}>
            <Link href={screen3?.button.link}>
              <a>
                <Button type="hollow">{screen3?.button.text}</Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.aboutUs}>
        <div className={styles.aboutUs__wrapper}>
          <div className={styles.aboutUs__title}>
            <Title type="h2">{screen4?.title}</Title>
          </div>

          <div className={styles.aboutUs__image}>
            <img srcSet={screen4?.image?.srcSet ?? ""} src={screen4?.image?.sourceUrl ?? ""} alt={screen4?.image?.altText ?? ""} />
          </div>

          <div className={styles.aboutUs__column} dangerouslySetInnerHTML={{ __html: screen4?.text }}></div>
        </div>
      </section>

      <section>
        <div className={styles.faq__title} style={{ textAlign: "center" }}>
          <Title type="h2">{screen5?.title}</Title>
        </div>
        <img className={styles.faq__diag} srcSet={screen5?.image?.srcSet ?? ""} src={screen5?.image?.sourceUrl ?? ""} alt={screen5?.image?.altText ?? ""} />
      </section>

      <section className={styles.faq}>
        <div className={styles.faq__wrapper}>
          <div className={styles.faq__title}>
            <Title type="h2">{screen6?.title}</Title>
          </div>

          <div className={styles.faq__column}>
            {screen6?.faq.map(({ a, q }, i) => (
              <Fragment key={`faq-${i}`}>
                <p>{q}</p>
                <p>{a}</p>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.askQuestion}>
        <div className={styles.askQuestion__wrapper}>
          <div className={styles.askQuestion__title}>
            <Title type="h2">{screen7?.title}</Title>
          </div>
          <h5 className={styles.askQuestion__suptitle}>{screen7?.subtitle}</h5>

          <div className={styles.askQuestion__button}>
            <Link href={screen7?.button.link}>
              <a>
                <Button>{screen7?.button.text}</Button>
              </a>
            </Link>
          </div>
        </div> */}
      </section>
    </>
  )
}

// export const getStaticProps: GetStaticProps = async (context) => {
//   const page = await getMainPage()
//   return {
//     props: {
//       page,
//     },
//   }
// }
