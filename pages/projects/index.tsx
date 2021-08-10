import Card from "@modules/Card/Card"
import Title from "@modules/text/Title/Title"
import { useState, MouseEvent, useEffect } from "react"
import styles from "./index.module.sass"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation } from "swiper/core"
import { v4 as uuid } from "uuid"
import { ProjectsPreview } from "@/pages/api/projectsPreview"
import { ProjectLevels } from "../api/levels"

SwiperCore.use([Navigation])

interface Props {
}

const index: React.FC<Props> = ({ }) => {
  const [projects, setProjects] = useState<ProjectsPreview>()
  const [levels, setLevels] = useState<ProjectLevels>()
  const [swiperMainInst, setSwiperMainInst] = useState<SwiperCore>()
  const slideTo = (e: MouseEvent) => {
    if (!(e.target instanceof HTMLElement)) return
    if (!(swiperMainInst instanceof SwiperCore)) return
    const num = Number(String(e.target.dataset.slide))
    swiperMainInst.slideTo(num)
    localStorage.setItem("clickedSlide", String(num))
  }
  const [currentSlide, setCurrentSlide] = useState(0)
  const navSlides = levels?.map((v, i) => (
    <SwiperSlide key={uuid()}>
      <div className={styles.slide} onClick={slideTo} data-slide={i} data-current={currentSlide === i}>
        {v}
      </div>
    </SwiperSlide>
  ))
  useEffect(() => {
    let slide = Number(localStorage.getItem("clickedSlide") ?? "0") || 0
    swiperMainInst?.slideTo(slide)
  }, [swiperMainInst])
  useEffect(() => {
    fetch("/api/projectsPreview").then(res => res.json()).then(data => setProjects(data))
    fetch("/api/levels").then(res => res.json()).then(data => setLevels(data))
    return () => {
      
    }
  }, [])
  return (
    <section className={styles.projects}>
      <div className="container">
        <div className={styles.projects__title}>
          <Title type="h2">Projects</Title>
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

        <div className={styles.swipe}>
          <Swiper
            onSwiper={(swiper) => setSwiperMainInst(swiper)}
            onSlideChange={(swiper) => {
              setCurrentSlide(swiper.activeIndex)
            }}
            spaceBetween={50}
          >
            {levels?.map((lvl) => (
              <SwiperSlide key={uuid()} data-project={true}>
                {projects?.filter(({level}) => level === lvl).map(({ link, brief, image, level, title }) => (
                  <Card title={title} about={brief} link={link} src={image?.sourceUrl ?? ""} imgAlt={image?.altText ?? ""} srcSet={image?.srcSet ?? ""} buttons={true} more={true} key={uuid()} />
                ))}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default index