import type { NextApiRequest, NextApiResponse } from "next"
import cookie from "cookie"

const query = `
query GetViewer {
  viewer {
    id
  }
}
`

interface IUser {
  data: {
    viewer: {
      id: string
    }
  }
}

export type User =
  | IUser["data"]["viewer"]
  | {
      success: boolean
    }

async function getUser(cookie: string) {
  const headers: any = { "Content-Type": "application/json" }
  headers["Authorization"] = `Bearer ${cookie}`
  const res = await fetch(process.env.WORDPRESS_API_URL as string, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
  })
  const json = (await res.json()) as IUser
  return json.data.viewer
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { jazz } = cookie.parse(req.headers.cookie ?? "")
  if (!jazz) return res.send({ success: false })
  const content = await getUser(jazz)
  if (content?.id) return res.status(200).send({ success: true })
  return res.status(403).send({ success: false })
  // const content = await loginUser(body)
  // res.status(200).json({ success: Boolean(content?.login?.authToken) })
  // res.send(content)
}
