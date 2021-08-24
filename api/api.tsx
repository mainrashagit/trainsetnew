const API_URL = process.env.WORDPRESS_API_URL as string

export type WP_Image = {
  srcSet: string | null
  altText: string | null
  sourceUrl: string | null
} | null

export async function fetchAPI(query: string, { variables }: any = {}) {
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

export type MainPage = {
  screen1: {
    button: { link: string; text: string }
    title: string
    subtitle: string
    image: WP_Image
  }
  screen2: {
    subtitle: string
    text: string
  }
  screen3: {
    title: string
    button: {
      text: string
      link: string
    }
  }
  screen4: {
    title: string
    text: string
    image: WP_Image
  }
  screen5: {
    title: string
    image: WP_Image
  }
  screen6: {
    title: string
    faq: {
      a: any
      q: any
    }[]
  }
  screen7: {
    title: string
    subtitle: string
    button: {
      text: string
      link: string
    }
  }
  title: string
}

export async function getMainPage(): Promise<MainPage> {
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
              sourceUrl
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
              sourceUrl
            }
          }
          screen5 {
            title
            image {
              srcSet
              altText
              sourceUrl
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
        title
        pageTitle {
          title
        }
      }
    }
  `
  )

  return { ...data.page.mainpage, title: data.page.pageTitle?.title?.length > 0 ? data.page.pageTitle?.title : data.page.title }
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
  pageTitle: string
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
      title
      pageTitle {
        title
      }
    }
  }
`
  )
  return { ...data.page.homeDocs, pageTitle: data.page.pageTitle?.title ?? data.page.title }
}

interface IArticlePaths {
  posts: {
    edges: {
      node: {
        slug: string
        categories: {
          edges: {
            node: {
              slug: string
            }
          }[]
        }
      }
    }[]
  }
}

type ArticlePaths = {
  params: {
    category: string
    article: string
  }
}[]

export async function getAllAcademyArticlePaths(): Promise<ArticlePaths> {
  const data = (await fetchAPI(
    `
    query MyQuery {
      posts(where: {categoryName: "docs"}) {
        edges {
          node {
            slug
            categories {
              edges {
                node {
                  slug
                }
              }
            }
          }
        }
      }
    }
    
  `
  )) as IArticlePaths

  return data.posts.edges.map((edge) => ({ params: { category: edge.node.categories.edges.find((item) => item.node.slug !== "docs")!.node.slug, article: edge.node.slug } }))
}

interface ICategoryArticleLinks {
  posts: {
    edges: {
      node: {
        slug: string
        categories: {
          edges: {
            node: {
              slug: string
            }
          }[]
        }
        title: string
      }
    }[]
  }
}

interface IArticleLinks {
  [link: string]: string
}

export async function getArticleLinksByCategory(category: string): Promise<IArticleLinks> {
  const data = (await fetchAPI(
    `
    query {
      posts(where: {categoryName: "${category}"}) {
        edges {
          node {
            slug
            categories {
              edges {
                node {
                  slug
                }
              }
            }
            title
          }
        }
      }
    }
    
  `
  )) as ICategoryArticleLinks

  const res: IArticleLinks = {}

  data.posts.edges.forEach((edge) => (res[`${edge.node.categories.edges.find((item) => item.node.slug !== "docs")!.node.slug}/${edge.node.slug}`] = edge.node.title))

  return res
}

interface IArticleByTitle {
  posts: {
    edges: {
      node: {
        title: string
        pageTitle: {
          title: string
        }
        docs: {
          sections: {
            title: string
            subsections: {
              text: string
              subtitle: string
            }[]
          }[]
          date: string
          author: {
            name: string
            photo: {
              altText: string
              sourceUrl: string
              srcSet: string
            }
          }
        }
      }
    }[]
  }
}

export interface IArticle {
  title: string
  docs: {
    sections: {
      title: string
      subsections: {
        text: string
        subtitle: string
      }[]
    }[]
    date: string
    author: {
      name: string
      photo?: {
        altText: string
        sourceUrl: string
        srcSet: string
      }
    }
  }
}

export async function getArticleByTitle(title: string): Promise<IArticle> {
  const data = (await fetchAPI(
    `
    query  {
      posts(where: {title: "${title}"}) {
        edges {
          node {
            docs {
              sections {
                subsections {
                  text
                  subtitle
                }
                title
              }
              date
              author {
                name
                photo {
                  altText
                  sourceUrl
                  srcSet
                }
              }
            }
            title
            pageTitle {
              title
            }
          }
        }
      }
    }    
  `
  )) as IArticleByTitle

  return { ...data.posts.edges[0].node, title: data.posts.edges[0].node.pageTitle?.title ?? data.posts.edges[0].node.title }
}

interface IProjectPaths {
  posts: {
    nodes: {
      slug: string
    }[]
  }
}

type ProjectPaths = {
  params: {
    proj: string
  }
}[]

export async function getProjectPaths(): Promise<ProjectPaths> {
  const data = (await fetchAPI(`
  query MyQuery {
    posts(where: {categoryName: "projects"}) {
      nodes {
        slug
      }
    }
  }
  `)) as IProjectPaths
  return data.posts.nodes.map((node) => ({ params: { proj: node.slug } }))
}

interface IProject {
  post: {
    projects: {
      about: {
        text: string
        title: string
      }
      author: {
        title: string
        name: string
        aboutAuthor: string
        photo: {
          altText: string
          sourceUrl: string
          srcSet: string
        }
      }
      image: {
        altText: string
        sourceUrl: string
        srcSet: string
      }
      requirements: {
        title: string
        text: string
      }
      support: {
        title: string
        text: string
      }
      tags: {
        tag: string
      }[]
    }
    categories: {
      nodes: {
        name: string
      }[]
    }
    title: string
    pageTitle: {
      title: string
    }
  }
}

export type ProjectBySlug = {
  content: {
    about: {
      text: string
      title: string
    }
    author: {
      title: string
      name: string
      aboutAuthor: string
      photo: {
        altText: string
        sourceUrl: string
        srcSet: string
      }
    }
    image: {
      altText: string
      sourceUrl: string
      srcSet: string
    }
    requirements: {
      title: string
      text: string
    }
    support: {
      title: string
      text: string
    }
    tags: {
      tag: string
    }[]
    projectTitle: string
    title: string
  }
  category: string
}

export async function getProjectBySlug(id: string): Promise<ProjectBySlug> {
  const data = (await fetchAPI(`
  query {
    post(id: "${id}", idType: SLUG) {
      projects {
        about {
          text
          title
        }
        author {
          title
          name
          aboutAuthor
          photo {
            altText
            srcSet
            sourceUrl
          }
        }
        image {
          altText
          sourceUrl
          srcSet
        }
        requirements {
          title
          text
        }
        support {
          title
          text
        }
        tags {
          tag
        }
      }
      categories(where: {nameLike: "level"}) {
        nodes {
          name
        }
      }
      title
      pageTitle {
        title
      }
    }
  }
  `)) as IProject
  return {
    content: { ...data.post.projects, title: data.post.pageTitle?.title ?? data.post.title, projectTitle: data.post.title },
    category: data.post.categories.nodes[0].name,
  }
}

interface IBlogPaths {
  posts: {
    nodes: {
      slug: string
    }[]
  }
}

type BlogPaths = {
  params: {
    blog: string
  }
}[]

export async function getBlogPaths(): Promise<BlogPaths> {
  const data = (await fetchAPI(`
  query MyQuery {
    posts(where: {categoryName: "blog"}) {
      nodes {
        slug
      }
    }
  }  
  `)) as IBlogPaths

  return data.posts.nodes.map((node) => ({ params: { blog: node.slug } }))
}

interface IBlogLinks {
  posts: {
    nodes: {
      slug: string
      title: string
    }[]
  }
}

export type BlogLinks = {
  link: string
  title: string
}[]

export async function getBlogLinks(): Promise<BlogLinks> {
  const data = (await fetchAPI(`
  query MyQuery {
    posts(where: {categoryName: "blog"}) {
      nodes {
        slug
        title
      }
    }
  }  
  `)) as IBlogLinks

  return data.posts.nodes.map((node) => ({ link: node.slug, title: node.title }))
}

interface IBlogBySlug {
  post: {
    blog: {
      author: {
        name: string
        photo: {
          altText: string
          sourceUrl: string
          srcSet: string
        }
      }
      sections: {
        title: string
        info: string
      }[]
      date: string
    }
    title: string
    pageTitle: {
      title: string
    }
  }
}

export type BlogBySlug = {
  blog: {
    author: {
      name: string
      photo: {
        altText: string
        sourceUrl: string
        srcSet: string
      }
    }
    sections: {
      title: string
      info: string
    }[]
    date: string
  }
  title: string
  pageTitle: string
}

export async function getBlogBySlug(id: string): Promise<BlogBySlug> {
  const data = (await fetchAPI(`
  query MyQuery {
    post(id: "${id}", idType: SLUG) {
      blog {
        author {
          name
          photo {
            altText
            sourceUrl
            srcSet
          }
        }
        sections {
          title
          info
        }
        date
      }
      title
      pageTitle {
        title
      }
    }
  }
  `)) as IBlogBySlug

  return { ...data.post, pageTitle: data.post.pageTitle?.title ?? data.post.title }
}
