import type { NextApiRequest, NextApiResponse } from "next"
import { WP_Image } from "@/api/api"

const query = `
query MyQuery {
  page(id: "241", idType: DATABASE_ID) {
    profile {
      profileImage {
        srcSet
        sourceUrl
        altText
      }
    }
  }
}
`

interface IProfile {
  data: {
    page: {
      profile: {
        profileImage: WP_Image
      }
    }
  }
}

export type Profile = WP_Image

async function getProfile(): Promise<Profile> {
  const headers: any = { "Content-Type": "application/json" }
  const res = await fetch(process.env.WORDPRESS_API_URL as string, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
  })
  const json = (await res.json()) as IProfile
  return json.data.page.profile.profileImage
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const content = await getProfile()
  res.send(content)
}
