// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: "John Doe" })
}

const API_URL = process.env.WORDPRESS_API_URL ?? ("http://wp-trainset.ai.xsph.ru/graphql" as string)

async function fetchAPI(query: string, { variables }: any = {}) {
  const headers: any = { "Content-Type": "application/json" }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }
  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  if (res.status === 404) throw res.statusText
  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch API")
  }
  return json.data
  // return res
}

export async function getPageByID(id: number) {
  const data = await fetchAPI(
    `
    query {
      pageBy(pageId: ${id}) {
        title
        content
      }
    }
  `
  )

  return data.pageBy
}
export async function getMainPage() {
  const data = await fetchAPI(
    `
    query {
      page(id: "31", idType: DATABASE_ID) {
        mainpage {
          screen2 {
            subtitle
            title
          }
          screen1 {
            button {
              link
              text
            }
            title
            subtitle
            image {
              srcSet
              altText
            }
          }
          screen3 {
            title
            button {
              text
              link
            }
          }
          screen4 {
            text
            title
            image {
              srcSet
              altText
            }
          }
          screen5 {
            title
            image {
              srcSet
              altText
            }
          }
          screen6 {
            title
            faq {
              a
              q
            }
          }
          screen7 {
            subtitle
            title
            button {
              text
              link
            }
          }
        }
      }
    }
  `
  )

  return data.page.mainpage
}

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
      }
    }[]
  }
}

export async function getLayout(): Promise<ILayout> {
  const data = await fetchAPI(
    `
    query MyQuery {
       pageBy(pageId: 109) {
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
               }
             }
           }
         }
       }
     }  
  `
  )

  return data.pageBy.global
}

export interface IAcademyPage {
  title: string
  text: string
  date: string
  author: {
    name: string
    photo: {
      sourceUrl: string
      altText: string
    }
  }
}

export async function getAcademyPage(): Promise<IAcademyPage> {
  const data = await fetchAPI(
    `
  query MyQuery {
    page(id: "160", idType: DATABASE_ID) {
      homeDocs {
        title
        text
        date
        author {
          name
          photo {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`
  )
  return data.page.homeDocs
}

export async function getAllPages() {
  const data = await fetchAPI(
    `
    query getAllPages {
      pages {
        edges {
          node {
            title
            content
          }
        }
      }
    }
  `
  )

  return data?.pages.edges
}
