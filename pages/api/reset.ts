import type { NextApiRequest, NextApiResponse } from "next"
const API_URL = process.env.WORDPRESS_API_URL as string

async function resetPassword(login: string, key: string, password: string) {
  const query = `
  mutation ResetPassword {
    resetUserPassword(input: {key: "${key}", login: "${login}", password: "${password}"}) {
      clientMutationId
    }
  }  
  `
  const headers: any = { "Content-Type": "application/json" }
  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
    }),
  })
  const result = await res.json()
  if ("errors" in result) return result.errors[0]
  return {success: true}
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body)
  const { login, key } = body.params
  const { password } = body.values
  const result = await resetPassword(login, key, password)
  res.send(result)
}
