import type { NextApiRequest, NextApiResponse } from "next"
import cookie from "cookie"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("jazz", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      path: "/",
      maxAge: 0,
    })
  )
  res.status(200).json({ success: true })
}