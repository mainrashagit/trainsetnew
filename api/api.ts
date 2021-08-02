// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}

const API_URL = process.env.WORDPRESS_API_URL as string

async function fetchAPI(query: string, { variables }: any = {}) {
  const headers: any = { 'Content-Type': 'application/json' }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }
  const res = await fetch(API_URL, {
    method: 'POST',
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
    throw new Error('Failed to fetch API')
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
      pageBy(pageId: 31) {
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
            text
            title
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

  return data.pageBy.mainpage
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