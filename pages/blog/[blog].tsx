import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import Container from "@modules/Container/Container"
import Title from "@modules/text/Title/Title"
import Sidebar from "@modules/text/Sidebar/Sidebar"
import ArrowTop from "@modules/text/ArrowTop/ArrowTop"
import Author from "@modules/text/Author/Author"
import { BlogBySlug, BlogLinks, getBlogBySlug, getBlogLinks, getBlogPaths } from "@/api/api"
import { v4 as uuid } from "uuid"

interface Props {
  page: BlogBySlug
  links: BlogLinks
  current: string
  title: string
}

const Blog: React.FC<Props> = ({
  page: {
    blog: { date, sections, author },
    title,
  },
  links,
  current,
}) => {
  return (
    <>
      <Container>
        <Title margin={true}>TrainSet Academy</Title>
        <Sidebar items={links.map(({ link, title }) => ({ text: title, link, active: link === current }))} />
        <h3>{title}</h3>

        {sections.map(({ title: sectionTitle, info }) => (
          <section key={uuid()}>
            <h4>{sectionTitle}</h4>
            <section>{info}</section>
          </section>
        ))}

        <section>
          <Author name={author.name} about={date} src={author.photo.sourceUrl} srcSet={author.photo.srcSet} imgAlt={author.photo.altText} />
        </section>
        <ArrowTop />
      </Container>
    </>
  )
}

export default Blog

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getBlogPaths()
  return {
    paths: paths,
    fallback: "blocking",
  }
}

interface IParams extends ParsedUrlQuery {
  blog: string
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { blog } = params as IParams
  const content = await getBlogBySlug(blog)
  const links = await getBlogLinks()
  return {
    props: {
      page: content,
      links,
      current: blog,
    },
    revalidate: 10
  }
}
