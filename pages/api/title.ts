import { fetchAPI } from "@/api/api"
import type { NextApiRequest, NextApiResponse } from "next"

async function getTitle(id: string) {
  const query = `
  query GetTitle {
    page(id: "${id}", idType: DATABASE_ID) {
      title
      pageTitle {
        title
      }
    }
  }
  
`
  const content = await fetchAPI(query)
  return content.page.pageTitle?.title ?? content.page.title
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  res.send(await getTitle(req.body))
}
