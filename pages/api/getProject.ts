import type { NextApiRequest, NextApiResponse } from "next"
import cookie from "cookie"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const cook = cookie.parse(req.headers.cookie ?? "")
  const { jazz } = cook
  const jid = cook["jupyterhub-session-id"]
  console.log(jid)
  const result = await fetch("https://jupyterhub.trainset.ai/hub/user/test/notebooks/notebooks/tlm_project1.ipynb", {
    headers: {
      "Authorization": `Bearer ${jid}`
    },
    redirect: "manual"
  })

  console.log(result)
  
  res.status(200).json({})
}
