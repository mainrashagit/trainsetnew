import type { NextApiRequest, NextApiResponse } from "next"
import cookie from "cookie"
import { refreshToken } from "./isLoggedIn"
import { fetchAPI } from "@/api/api"

async function mark(id: string, proj?: string, cookies?: string, kill?: boolean): Promise<any> {
  const headers: any = { "Content-Type": "application/json" }
  headers["Authorization"] = `Bearer ${cookies}`
  const query1 = `
  query MyQuery {
    user(id: "${id}") {
      lastName
    }
  }
  `
  const res = await fetch(process.env.WORDPRESS_API_URL as string, {
    method: "POST",
    headers,
    body: JSON.stringify({ query: query1 }),
  })
  const bod = await res.json()
  if (bod?.data?.user === null) return { success: false }
  let marked: string[] = bod?.data?.user?.lastName !== null ? bod.data.user.lastName.split(" ") : []
  if (!proj) return Array.from(new Set(marked))
  if (kill) {
    marked = marked.filter((m) => m !== proj)
  } else {
    marked.push(proj)
  }
  const query2 = `
  mutation MyMutation {
    updateUser(input: {id: "${id}", lastName: "${Array.from(new Set(marked)).join(" ")}"}) {
      user {
        lastName
      }
    }
  }
  `
  const res1 = await fetch(process.env.WORDPRESS_API_URL as string, {
    method: "POST",
    headers,
    body: JSON.stringify({ query: query2 }),
  })
  const bod1 = await res1.json()
  const marked1 = bod1?.data?.updateUser?.user?.lastName !== null ? bod1?.data?.updateUser?.user?.lastName.split(" ") : []
  return marked1
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  let bod = JSON.parse(req.body)
  const id = bod?.id ?? ""
  let jazz = bod?.jazz ?? ""
  const kill = bod?.kill ?? false
  const proj = bod?.proj ?? undefined
  const { funk } = cookie.parse(req.headers.cookie ?? "")
  let content = await mark(id, proj, jazz, kill)
  if ("success" in content && content.success === false) {
    jazz = await refreshToken(funk)
    content = await mark(id, proj, jazz, kill)
    res.send({ content })
    return
  }
  res.send({ content })
}
