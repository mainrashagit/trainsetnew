import { getAllAcademyArticlePaths } from "@/api/api"
import { ArticleLinks } from "@/pages/api/academyArticleLinks"
import Link from "next/link"
import { useEffect, useState } from "react"
import styles from "./index.module.sass"

interface Props {}

type Category = { link: string; title: string }[]

const Nav: React.FC<Props> = ({}) => {
  const [links, setLinks] = useState<ArticleLinks>()
  const [regression, setRegression] = useState<Category>([])
  const [classification, setClassification] = useState<Category>([])
  const [clustering, setClustering] = useState<Category>([])
  const [generation, setGeneration] = useState<Category>([])

  useEffect(() => {
    fetch("/api/academyArticleLinks")
      .then((res) => res.json())
      .then((data) => setLinks(data))
    return () => {}
  }, [])
  useEffect(() => {
    const obj: {
      [cat: string]: Category
    } = {
      regression: [],
      classification: [],
      clustering: [],
      generation: [],
    }
    links?.forEach(({ category, link, title }) => {
      obj[category].push({ link: `/academy/${category}/${link}`, title })
    })
    setRegression(obj.regression)
    setClassification(obj.classification)
    setClustering(obj.clustering)
    setGeneration(obj.generation)
    return () => {}
  }, [links])
  return (
    <div className={styles.tableOfContent}>
      <h5 className={styles.tableOfContent__title}>MACHINE LEARNING</h5>

      <div className={styles.tableOfContent__wrapper}>
        <div className={styles.navigationDocs}>
          <h6 className={styles.navigationDocs__title}>SUPERVISED LEARNING</h6>
          <div className={styles.navigationDocs__column}>
            <p className={styles.navigationDocs__suptitle}>REGRESSION</p>

            {regression?.map(({ link, title }, i) => (
              <Link href={link} key={`${link}-${i}`}>
                <a className={styles.navigationDocs__link}>{title}</a>
              </Link>
            ))}
          </div>

          <div className={styles.navigationDocs__column}>
            <p className={styles.navigationDocs__suptitle}>CLASSIFICATION</p>

            {classification?.map(({ link, title }, i) => (
              <Link href={link} key={`${link}-${i}`}>
                <a className={styles.navigationDocs__link}>{title}</a>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.navigationDocs}>
          <h6 className={styles.navigationDocs__title}>UNSUPERVISED LEARNING</h6>
          <div className={styles.navigationDocs__column}>
            <p className={styles.navigationDocs__suptitle}>CLUSTERING</p>

            {clustering?.map(({ link, title }, i) => (
              <Link href={link} key={`${link}-${i}`}>
                <a className={styles.navigationDocs__link}>{title}</a>
              </Link>
            ))}
          </div>

          <div className={styles.navigationDocs__column}>
            <p className={styles.navigationDocs__suptitle}>GENERATION</p>

            {generation?.map(({ link, title }, i) => (
              <Link href={link} key={`${link}-${i}`}>
                <a className={styles.navigationDocs__link}>{title}</a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav
