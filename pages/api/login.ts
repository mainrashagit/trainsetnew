import type { NextApiRequest, NextApiResponse } from "next"
import cookie from "cookie"

interface LoginUserProps {
  username: string
  password: string
}

async function loginUser({ username, password }: LoginUserProps) {
  const headers: any = { "Content-Type": "application/json" }
  const query = `
  mutation LoginUser {
    login(input: {username: "${username}", password: "${password}"}) {
      refreshToken
      authToken
      user {
        username
      }
    }
  }
`
  const res = await fetch(process.env.WORDPRESS_API_URL as string, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
  })
  if (res.status === 404) throw res.statusText
  const json = await res.json()
  return json.data
  // const json = await res.json()
  // console.log(res.headers, json)
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body)
  const content = await loginUser(body)
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth", String(content?.login?.authToken ?? ""), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })
  )
  res.status(200).json({ success: Boolean(content?.login?.authToken) })
  // res.send(content)
}
