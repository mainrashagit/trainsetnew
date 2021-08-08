import type { NextApiRequest, NextApiResponse } from "next"
import cookie from "cookie"

const query = `
query GetViewer {
  viewer {
    name
  }
}
`

async function getUser(cookie: string) {
  const headers: any = { "Content-Type": "application/json" }
  headers["Authorization"] = `Bearer ${cookie}`
  const res = await fetch(process.env.WORDPRESS_API_URL as string, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
  })
  const json = await res.json()
  console.log(json)
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // const body = JSON.parse(req.body)
  const { auth } = cookie.parse(req.headers.cookie ?? "")
  const content = await getUser(auth)
  // const content = await loginUser(body)
  // res.status(200).json({ success: Boolean(content?.login?.authToken) })
  // res.send(content)
}
