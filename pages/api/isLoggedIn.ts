import type { NextApiRequest, NextApiResponse } from "next"
import cookie from "cookie"

const query = `
query GetViewer {
  viewer {
    id
    username
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
      id: string
      username: string
      roles: {
        nodes: {
          name: string
        }[]
      }
    }
  }
}

export type User =
  | {
      id: string
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
  if (res.status !== 200) return { success: false }
  const json = (await res.json()) as IUser
  if (json.data.viewer === null) return { success: false }
  return {
    id: json.data.viewer.id,
    username: json.data.viewer.username,
    role: json.data.viewer.roles.nodes[0].name,
  }
}

interface IRefreshToken {
  data: {
    refreshJwtAuthToken: {
      authToken: string
    }
  }
}

export async function refreshToken(token: string) {
  const headers: any = { "Content-Type": "application/json" }
  const query = `
  mutation RefreshAuthToken {
    refreshJwtAuthToken(input: {jwtRefreshToken: "${token}"}) {
      authToken
    }
  }  
  `
  const res = await fetch(process.env.WORDPRESS_API_URL as string, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
  })
  const json = (await res.json()) as IRefreshToken | { errors: { message: string } }
  if ("errors" in json) {
    return json.errors
  }
  return json.data.refreshJwtAuthToken.authToken
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  let jazz = req.body
  const { funk } = cookie.parse(req.headers.cookie ?? "")
  let content = await getUser(jazz)
  if ("success" in content && content.success === false) {
    jazz = await refreshToken(funk)
    content = await getUser(jazz)
  }
  res.send({ jazz, content })
}
