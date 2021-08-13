const API_URL = process.env.WORDPRESS_API_URL as string
import type { NextApiRequest, NextApiResponse } from "next"
import cookie from "cookie"
import { fetchAPI } from "@/api/api"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const body = req.body
  if (body.status !== "COMPLETED") res.status(500).end()
  const query = `
  mutation MyMutation {
    updateUser(input: {id: "${body.id}", roles: "paid_subscriber"}) {
      clientMutationId
    }
  }
`
  const result = await fetchAPI(query)
  res.send(result)
}
