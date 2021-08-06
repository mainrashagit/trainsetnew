import { fetchAPI } from "@/api/api"
import type { NextApiRequest, NextApiResponse } from "next"

interface IArticleLinksAll {
  posts: {
    edges: {
      node: {
        slug: string
        categories: {
          edges: {
            node: {
              slug: string
            }
          }[]
        }
        title: string
      }
    }[]
  }
}

export type ArticleLinks = {
  category: string
  link: string
  title: string
}[]

export async function getAllAcademyArticleLinks(): Promise<ArticleLinks> {
  const data = (await fetchAPI(
    `
    query MyQuery {
      posts(where: {categoryName: "docs"}) {
        edges {
          node {
            slug
            categories {
              edges {
                node {
                  slug
                }
              }
            }
            title
          }
        }
      }
    }
    
  `
  )) as IArticleLinksAll

  return data.posts.edges.map((edge) => ({
    category: edge.node.categories.edges.find((item) => item.node.slug !== "docs")!.node.slug,
    link: edge.node.slug,
    title: edge.node.title,
  }))
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const content = await getAllAcademyArticleLinks()
  res.send(content)
}
