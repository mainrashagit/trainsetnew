import { fetchAPI } from "@/api/api"
import type { NextApiRequest, NextApiResponse } from "next"


export interface ILayout {
  header: {
    nav: {
      link: string
      text: string
    }[]
    logo: {
      altText: string
      srcSet: string
    }
  }
  footer: {
    nav: {
      link: string
      text: string
    }[]
    soc: {
      link: string
      image: {
        altText: string
        srcSet: string
        sourceUrl: string
      }
    }[]
  }
}

export async function getLayout(): Promise<ILayout> {
  const data = await fetchAPI(
    `
    query MyQuery {
       page(id: "109", idType: DATABASE_ID) {
         global {
           header {
             nav {
               link
               text
             }
             logo {
               altText
               srcSet
             }
           }
           footer {
             nav {
               text
               link
             }
             soc {
               link
               image {
                 altText
                 srcSet
                 sourceUrl
               }
             }
           }
         }
       }
     }  
  `
  )

  return data.page.global
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const content = await getLayout()
  res.send(content)
}
