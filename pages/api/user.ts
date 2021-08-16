import type { NextApiRequest, NextApiResponse } from "next"
import cookie from "cookie"
import { refreshToken } from "./isLoggedIn"

const query = `
query GetViewer {
  viewer {
    username
    avatar {
      url
    }
    roles {
      nodes {
        name
      }
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
      roles: {
        nodes: { name: string }[]
      }
    }
  }
}

export type User =
  | {
    avatar: {
      url: string
    }
    username: string
    role: string
  }
  | {
      success: boolean
    }

async function getUser(cookie: string): Promise<User> {
  const headers: any = { "Content-Type": "application/json" }
  headers["Authorization"] = `Bearer ${cookie}`
  const res = await fetch(process.env.WORDPRESS_API_URL as string, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
  })
  const json = (await res.json()) as IUser
  if (json.data.viewer !== null) return {
    avatar: json.data.viewer.avatar,
    username: json.data.viewer.username,
    role: json.data.viewer.roles.nodes[0].name
  }
  return { success: false }
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  let jazz = req.body
  const { funk } = cookie.parse(req.headers.cookie ?? "")
  let content = await getUser(jazz)
  if ("success" in content && !content.success) {
    jazz = await refreshToken(funk)
    content = await getUser(jazz)
    res.send({ jazz, content })
    return
  }
  res.send({ content })
}
