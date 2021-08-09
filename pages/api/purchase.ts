const API_URL = process.env.WORDPRESS_API_URL as string
import type { NextApiRequest, NextApiResponse } from "next"
import cookie from "cookie"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const body = req.body
  console.log(body, body.status, body.status === "COMPLETED")
}
