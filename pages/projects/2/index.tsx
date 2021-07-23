import styles from "./index.module.sass"
import Card from "@modules/projects/Card/Card"
import Section from "@modules/text/Section/Section"
import P from "@modules/text/P/P"
import Author from "@modules/text/Author/Author"
import Title from "@modules/text/Title/Title"
import { MouseEvent } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation } from "swiper/core"
import { v4 as uuid } from "uuid"
import Link from "next/link"
import ArrowTop from "@modules/text/ArrowTop/ArrowTop"

SwiperCore.use([Navigation])

interface Props {}

const index: React.FC<Props> = ({}) => {
  const slideTo = (e: MouseEvent) => {
    if (!(e.target instanceof HTMLElement)) return
    localStorage.setItem("clickedSlide", e.target.dataset.slide ?? "0")
  }
  const navSlides = Array.from(Array(4).keys()).map((v, i) => (
    <SwiperSlide key={uuid()}>
      <Link href="/projects">
        <a className={styles.slide} onClick={slideTo} data-slide={i} data-current={i === 2}>
          Level {i}
        </a>
      </Link>
    </SwiperSlide>
  ))
  return (
    <section className={styles.project}>
      <div className={styles.project__title}>
        <Title type="h1">TrainSet Academy</Title>
      </div>

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

      <Card
        title={"Fasting Blood Sugar Prediction"}
        img={"/cards/2.png"}
        imgAlt={"bloodbag"}
        tags={[
          "Data Preprocessing",
          "Model Building",
          "Model Evaluation",
          "Hyperparameter Tuning",
          "Feature Engineering",
          "GBM",
          "Random Forest",
        ]}
        pId={1}
      />
      <Section title={"1. About this course"}>
        <P>
          In this project you will build a simple ML model to predict (a probability of) a heart disease of a patient.
        </P>
        <P>
          The project contains 7 sections in total, each with <b>step-by-step instructions</b> of what to do. In addition, the project contains the <b>bonus questions</b> intended for advanced students or those who is willing to do some additional googling in order to familiarize themselves with potentially new concepts.
        </P>
      </Section>
      <Section title={"2. Requirements"}>
        <P>
          Knowledge of <b>syntax</b> (e.g. for/while loops and if statements), knowledge of <b>pandas</b> in data preprocessing (e.g. delete/insert column, change column name, slice/filter/merge/split a table etc.), knowledge of <b>data types</b> (e.g. object/string/int/float).
        </P>
      </Section>
      <Section title={"3. Support"}>
        <P>
          You are stuck and need some help? Join our Slack channel to get <b>our support and code review</b>. Happy programming!
        </P>
      </Section>
      <Section title={"4. About the Author"}>
        <Author
          name="Andrew Wolf"
          about={[
            "Founder of ML Cookbook & The Learning Machine;",
            "Data Scientist",
          ]}
          img="/academy/avatar_1.png"
        />
      </Section>
      <ArrowTop />
    </section>
  )
}

export default index
