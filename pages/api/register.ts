import type { NextApiRequest, NextApiResponse } from "next"

interface RegisterUserProps {
  username: string
  email: string
  password: string
}

interface IUserSuccess {
  user: {
    username: string
  }
}

interface IUserError {
  message: string
}

export type User = IUserSuccess | IUserError

async function registerUser({ username, email, password }: RegisterUserProps): Promise<User> {
  const headers: any = { "Content-Type": "application/json" }
  const query = `
  mutation RegisterUser {
    registerUser(input: {username: "${username}", email: "${email}", password: "${password}"}) {
      user {
        username
      }
    }
  }
`
  const res = await fetch(
    process.env.WORDPRESS_API_URL as string,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ query }),
    }
  )
  if (res.status === 404) throw res.statusText
  const json = await res.json()
  if (json.errors) return json.errors[0] as IUserError
  return json.data.registerUser as IUserSuccess
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body)
  const content = await registerUser(body)
  res.send(content)
}
