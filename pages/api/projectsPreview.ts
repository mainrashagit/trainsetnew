import { fetchAPI } from "@/api/api"
import type { NextApiRequest, NextApiResponse } from "next"

interface IProjectsPreview {
  posts: {
    edges: {
      node: {
        slug: string
        projects: {
          shortDesc: string
          image: {
            altText: string
            sourceUrl: string
            srcSet: string
          }
        }
        categories: {
          edges: {
            node: {
              name: string
            }
          }[]
        }
        title: string
      }
    }[]
  }
}

export type ProjectsPreview = {
  link: string
  brief: string
  image: {
    altText: string
    sourceUrl: string
    srcSet: string
  }
  level: string
  title: string
}[]

export async function getProjectsPreview(): Promise<ProjectsPreview> {
  const data = (await fetchAPI(`
  query MyQuery {
    posts(where: {categoryName: "projects"}) {
      edges {
        node {
          slug
          projects {
            shortDesc
            image {
              altText
              sourceUrl
              srcSet
            }
          }
          categories {
            edges {
              node {
                name
              }
            }
          }
          title
        }
      }
    }
  }
  `)) as IProjectsPreview

  const res = data.posts.edges
    .map((edge) => ({
      link: edge.node.slug,
      brief: edge.node.projects.shortDesc,
      image: edge.node.projects.image,
      level: edge.node.categories.edges.find((item) => item.node.name.includes("Level"))!.node.name,
      title: edge.node.title,
    }))
    .sort((prev, curr) => Number(prev.level.match(/\d+/)) - Number(curr.level.match(/\d+/)))

  return res
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const content = await getProjectsPreview()
  res.send(content)
}
