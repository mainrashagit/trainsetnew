import { fetchAPI } from "@/api/api"
import type { NextApiRequest, NextApiResponse } from "next"

async function getPurchaseText() {
  const query = `
  query GetPurchaseText {
    page(id: "261", idType: DATABASE_ID) {
      purchase {
        description
        clientid
      }
    }
  }
`
  const content = await fetchAPI(query)
  return content.page.purchase
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  res.send(await getPurchaseText())
}
