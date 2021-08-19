import type { NextApiRequest, NextApiResponse } from "next"

async function getUserProjects(id: string): Promise<any> {
  const headers: any = { "Content-Type": "application/json" }
  const res = await fetch(`https://wp.trainset.ai/wp-json/acf/v3/users/${id}`)
  const json = (await res.json())
  if (json.data.viewer !== null) return {
    avatar: json.data.viewer.avatar,
    username: json.data.viewer.username,
    role: json.data.viewer.roles.nodes[0].name,
    id: json.data.viewer.userId
  }
  return { success: false }
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const id = req.body
  let content = await getUserProjects(id)
  res.send({ content })
}
