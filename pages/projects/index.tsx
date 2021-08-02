import Card from "@modules/Card/Card"
import Title from "@modules/text/Title/Title"
import { useState, MouseEvent, useEffect } from "react"
import styles from "./index.module.sass"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation } from "swiper/core"
import { v4 as uuid } from "uuid"

SwiperCore.use([Navigation])

interface Props {}

const index: React.FC<Props> = ({}) => {
  const [swiperMainInst, setSwiperMainInst] = useState<SwiperCore>()
  const slideTo = (e: MouseEvent) => {
    if (!(e.target instanceof HTMLElement)) return
    if (!(swiperMainInst instanceof SwiperCore)) return
    swiperMainInst.slideTo(parseInt(String(e.target.dataset.slide), 10))
  }
  const [currentSlide, setCurrentSlide] = useState(0)
  const navSlides = Array.from(Array(4).keys()).map((v, i) => (
    <SwiperSlide key={uuid()}>
      <div
        className={styles.slide}
        onClick={slideTo}
        data-slide={i}
        data-current={currentSlide === i}
      >
        Level {i}
      </div>
    </SwiperSlide>
  ))
  useEffect(() => {
    let slide = Number(localStorage.getItem("clickedSlide") ?? "0") ?? 0
    if (isNaN(slide)) slide = 0
    swiperMainInst?.slideTo(slide)
  }, [swiperMainInst])
  return (
    <section className={styles.projects}>
      <div className="container">
        <div className={styles.projects__title}>
          <Title type="h2">Projects</Title>
        </div>

        <div className={styles.nav}>
          <div
            className={styles.nav__btnLeft}
            id={"navBtnLeft"}
          ></div>
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
              disabledClass: styles.disabled
            }}
            className={`${styles.slides}`}
          >
              {navSlides}
          </Swiper>
          <div
            className={styles.nav__btnRight}
            id={"navBtnRight"}
          ></div>
        </div>

        <div>
          <Swiper
            onSwiper={(swiper) => setSwiperMainInst(swiper)}
            onSlideChange={(swiper) => {
              setCurrentSlide(swiper.activeIndex)
            }}
            spaceBetween={50}
          >
            <SwiperSlide>
              <Card
                title={"Car Price Prediction"}
                about={[
                  "In this project you will build a simple ML model to predict prices of cars based on their properties of your choice.",
                  "The project contains 6 sections in total, each with step-by-step instructions of what to do.",
                ]}
                pId={0}
                img={"/cards/0.webp"}
                imgAlt="car"
                buttons={true}
                more={true}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card
                title={"Heart Disease Prediction"}
                about={[
                  "In this project you will build a simple ML model to predict (a probability of) a heart disease of a patient.",
                  "The project contains 7 sections in total, each with step-by-step instructions of what to do. In addition, the project contains the bonus questions intended.",
                ]}
                pId={1}
                img={"/cards/1.webp"}
                imgAlt="car"
                buttons={true}
                more={true}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card
                title={"Fasting Blood Sugar Prediction"}
                about={[
                  "In this project you will build a simple ML model that predicts (a probability of) a fasting blood sugar of a patient is > 120 mg/dl.",
                  "The project contains 7 sections in total, each with step-by-step instructions of what to do.",
                ]}
                pId={2}
                img={"/cards/2.webp"}
                imgAlt="car"
                buttons={true}
                more={true}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card
                title={"Time Series Forecasting"}
                about={[
                  "In this project you will build a simple ML model that predicts a price of Google stocks.",
                  "The project contains 7 sections in total, each with step-by-step instructions of what to do.",
                ]}
                pId={3}
                img={"/cards/3.svg"}
                imgAlt="car"
                buttons={true}
                more={true}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default index
