import type { NextApiRequest, NextApiResponse } from "next"
import cookie from "cookie"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { jazz } = cookie.parse(req.headers.cookie ?? "")
  const result = await fetch("https://jupyterhub.trainset.ai/hub/login", {
    headers: {
      "Authorization": `Bearer ${jazz}`
    },
    // redirect: "manual"
  })
  const cks = result?.headers?.raw()["set-cookie"] ?? ""
  
  res.setHeader("Set-Cookie", cks[0])
  res.setHeader("Set-Cookie", cks[1].replace("/hub/", "/"))
  res.status(200).json({})
}
