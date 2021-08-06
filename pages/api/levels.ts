import { fetchAPI } from "@/api/api"
import type { NextApiRequest, NextApiResponse } from "next"

interface IProjectLevels {
  categories: {
    edges: {
      node: {
        name: string
      }
    }[]
  }
}

export type ProjectLevels = string[]

export async function getProjectLevels(): Promise<ProjectLevels> {
  const data = (await fetchAPI(`
  query {
    categories(where: {nameLike: "level"}) {
      edges {
        node {
          name
        }
      }
    }
  }
  `)) as IProjectLevels

  return data.categories.edges.map((edge) => edge.node.name)
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const content = await getProjectLevels()
  res.send(content)
}
