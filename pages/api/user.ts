import type { NextApiRequest, NextApiResponse } from "next"
import cookie from "cookie"

const query = `
query GetViewer {
  viewer {
    username
    avatar {
      url
    }
  }
}
`

interface IUser {
  data: {
    viewer: {
      avatar: {
        url: string
      }
      username: string
    }
  }
}

export type User = IUser["data"]["viewer"] | {
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
  const json = await res.json() as IUser
  if (json.data.viewer !== null) return json.data.viewer
  return { success: false }
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // const body = JSON.parse(req.body)
  const { jazz } = cookie.parse(req.headers.cookie ?? "")
  const content = await getUser(jazz)
  res.send(content)
  // const content = await loginUser(body)
  // res.status(200).json({ success: Boolean(content?.login?.authToken) })
  // res.send(content)
}
