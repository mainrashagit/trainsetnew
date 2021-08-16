const API_URL = process.env.WORDPRESS_API_URL as string
import type { NextApiRequest, NextApiResponse } from "next"
import cookie from "cookie"
import { fetchAPI } from "@/api/api"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const headers: any = { "Content-Type": "application/json" }
  const body = req.body
  const { funk } = cookie.parse(req.headers.cookie ?? "")
  if (body.status !== "COMPLETED") res.status(500).end()
  const query = `
  mutation MyMutation {
    updateUser(input: {id: "${body.id}", roles: "paid_subscriber"}) {
      clientMutationId
    }
  }
`
  const adminRes = await fetch(process.env.WORDPRESS_API_URL as string, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: `
  mutation LoginUser {
    login(input: {username: "${process.env.WORDPRESS_ADMIN_USERNAME}", password: "${process.env.WORDPRESS_ADMIN_PASSWORD}"}) {
      authToken
    }
  }
    `,
    }),
  })
  const admin = await adminRes.json()
  headers["Authorization"] = `Bearer ${admin.data.login.authToken}`
  const result = await fetch(process.env.WORDPRESS_API_URL as string, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
  })
  const json = await result.json()
  res.send(json.data)
}
