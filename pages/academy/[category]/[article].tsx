import { getAllAcademyArticlePaths, getArticleByTitle, getArticleLinksByCategory, IArticle } from "@/api/api"
import SubNav from "@modules/academy/SubNav/SubNav"
import Container from "@modules/Container/Container"
import ArrowTop from "@modules/text/ArrowTop/ArrowTop"
import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import styles from "./index.module.sass"
import parse, { domToReact } from "html-react-parser"
import { Fragment } from "react"
import Math from "@modules/text/Math/Math"
import { v4 as uuid } from "uuid"

interface Props {
  current: string
  links: {
    [link: string]: string
  }
  category: string
  content: IArticle
}

const Article: React.FC<Props> = ({
  links,
  current,
  content: {
    docs: { author, date, sections },
    title,
  },
  category,
}) => {
  const polyMath = (str: string) => {
    if (typeof str !== "string") return
    const reacted = parse(str, {
      replace: (domNode) => {
        if ("name" in domNode && "children" in domNode && domNode.name === "math") {
          return <Math>{domToReact(domNode.children)}</Math>
        }
      },
    })
    return reacted
  }
  return (
    <Container>
      <SubNav
        supertitle={""}
        title={category}
        activeLink={current}
        links={links}
        author={{
          name: author.name,
          about: date,
          src: author.photo?.sourceUrl,
          srcSet: author.photo?.srcSet,
          imgAlt: author.photo?.altText,
        }}
      />
      <article /* dangerouslySetInnerHTML={{ __html: doc }} */>
        {sections.map(({ title, subsections }) => (
          <Fragment key={uuid()}>
            <h3>{title}</h3>
            {subsections.map(({ text, subtitle }) => (
              <section key={uuid()}>
                <h4>{subtitle}</h4>
                {polyMath(text)}
              </section>
            ))}
          </Fragment>
        ))}
      </article>
      <ArrowTop />
    </Container>
  )
}

export default Article

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllAcademyArticlePaths()
  return {
    paths: paths,
    fallback: "blocking",
  }
}

interface IParams extends ParsedUrlQuery {
  category: string
  article: string
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { category, article } = params as IParams
  const links = await getArticleLinksByCategory(category)
  const articleTitle = links[`${category}/${article}`]
  const articleContent = await getArticleByTitle(articleTitle)
  return {
    props: {
      links,
      current: article,
      content: articleContent,
      category,
    },
    revalidate: 10,
  }
}
