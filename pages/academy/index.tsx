import Title from "@modules/text/Title/Title"
import Author from "@modules/text/Author/Author"
import ArrowTop from "@modules/text/ArrowTop/ArrowTop"
import styles from "./index.module.sass"
import Container from "@modules/Container/Container"
import Nav from "@modules/academy/Nav/Nav"
import { getAcademyPage, IAcademyPage } from "@/api/api"
import { GetStaticProps } from "next"

interface Props {
  page: IAcademyPage
}

const index: React.FC<Props> = ({
  page: {
    text,
    date,
    author: { name, photo },
  },
}) => {
  return (
    <>
      <Container>
        <Title type="h2" margin={true}>
          TrainSet Academy
        </Title>
        <Nav />

        <section dangerouslySetInnerHTML={{ __html: text }}></section>
        <Author about={[date]} name={name} img={photo?.sourceUrl ?? ""} imgAlt={photo?.altText ?? ""} />
        <ArrowTop />
      </Container>
    </>
  )
}

export default index

export const getStaticProps: GetStaticProps = async (context) => {
  const page = await getAcademyPage()
  return {
    props: {
      page,
    },
  }
}
