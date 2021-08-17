import { GetStaticPaths, GetStaticProps } from "next"
import styles from "./index.module.sass"
import { ParsedUrlQuery } from "querystring"
import { getProjectBySlug, getProjectPaths, ProjectBySlug } from "@/api/api"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation } from "swiper/core"
import { v4 as uuid } from "uuid"
import Link from "next/link"
import { MouseEvent, useEffect, useState } from "react"
import Container from "@modules/Container/Container"
import Card from "@modules/projects/Card/Card"
import Author from "@modules/text/Author/Author"
import { ProjectLevels } from "../api/levels"
import Head from "next/head"

SwiperCore.use([Navigation])

interface Props {
  page: ProjectBySlug
  link: string
}

const Project: React.FC<Props> = ({
  page: {
    content: { about, author, tags, support, requirements, image, title },
    category,
  },
  link,
}) => {
  const [levels, setLevels] = useState<ProjectLevels>()
  const slideTo = (e: MouseEvent) => {
    if (!(e.target instanceof HTMLElement)) return
    localStorage.setItem("clickedSlide", e.target.dataset.slide ?? "0")
  }

  useEffect(() => {
    fetch("/api/levels")
      .then((res) => res.json())
      .then((data) => setLevels(data))
    return () => {}
  }, [])

  const navSlides = levels?.map((v, i) => (
    <SwiperSlide key={uuid()}>
      <Link href="/projects">
        <a className={styles.slide} onClick={slideTo} data-slide={i} data-current={v === category}>
          Level {i}
        </a>
      </Link>
    </SwiperSlide>
  ))
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section className={styles.project}>
        <div className={styles.nav}>
          <div className={styles.nav__btnLeft} id={"navBtnLeft"}></div>
          <Swiper
            slidesPerView={1}
            slideToClickedSlide={true}
            breakpoints={{
              600: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
            }}
            navigation={{
              prevEl: "#navBtnLeft",
              nextEl: "#navBtnRight",
              disabledClass: styles.disabled,
            }}
            className={`${styles.slides}`}
          >
            {navSlides}
          </Swiper>
          <div className={styles.nav__btnRight} id={"navBtnRight"}></div>
        </div>
        <Card title={"Car Price Prediction"} src={image?.sourceUrl ?? ""} imgAlt={image?.altText ?? ""} srcSet={image?.srcSet ?? ""} tags={tags.map((tag) => tag.tag)} link={link} />
        <Container>
          <section>
            <h4>{about.title}</h4>
            {about.text}
          </section>
          <section>
            <h4>{requirements.title}</h4>
            {requirements.text}
          </section>
          <section>
            <h4>{support.title}</h4>
            {support.text}
          </section>
          <section>
            <h4>{author.title}</h4>
            <Author name={author.name} about={author.aboutAuthor} src={author.photo.sourceUrl} srcSet={author.photo.srcSet} imgAlt={author.photo.altText} />
          </section>
        </Container>
      </section>
    </>
  )
}

export default Project

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getProjectPaths()
  return {
    paths: paths,
    fallback: "blocking",
  }
}

interface IParams extends ParsedUrlQuery {
  proj: string
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { proj } = params as IParams
  const content = await getProjectBySlug(proj)
  return {
    props: {
      page: content,
      link: proj,
    },
    revalidate: 10,
  }
}
