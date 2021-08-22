import { fetchAPI } from "@/api/api"
import type { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"
import { IEmailInfo } from "./contact"

const API_URL = process.env.WORDPRESS_API_URL as string

async function sendResetLink(email: string) {
  const adminQuery = `
  mutation Admin {
    login(input: {username: "${process.env.WORDPRESS_ADMIN_LOGIN}", password: "${process.env.WORDPRESS_ADMIN_PASSWORD}"}) {
      authToken
    }
  }
  `
  const query = `
query Emails {
  users {
    nodes {
      email
      username
    }
  }
}
`
  const admin = await fetchAPI(adminQuery)
  const token = admin?.login?.authToken ?? ""
  const headers: any = { "Content-Type": "application/json" }
  headers["Authorization"] = `Bearer ${token}`

  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
    }),
  })
  const json = await res.json()
  const user = json?.data?.users?.nodes?.find((e: { email: string }) => e.email === email)

  if (!user) return false

  const resetQuery = `
  mutation MyMutation {
    sendPasswordResetEmail(input: {username: "${user.username}"}) {
      key
    }
  }
  `

  const resetData = await fetchAPI(resetQuery)
  const resetKey = resetData.sendPasswordResetEmail.key


  const emailInfoRes = (await fetchAPI(`
  query MyQuery {
    page(id: "248", idType: DATABASE_ID) {
      contactForm {
        burner {
          senderEmail
          senderPassword
        }
      }
    }
  }
  `)) as IEmailInfo
  const emailInfo = emailInfoRes.page.contactForm.burner
  const mailData = {
    to: email,
    subject: `Password reset`,
    text: `A request has been made to reset password for trainset.ai.\n\nTo reset your password, visit https://trainset.ai/auth/reset?key=${resetKey}&login=${user.username}\n\nIf you didn't make this request, ignore or delete this message.`,
  }
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: emailInfo.senderEmail,
      pass: emailInfo.senderPassword,
    },
  })
  await transporter.sendMail(mailData)
  return true
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body)
  const success = await sendResetLink(body.email)
  res.send({ success })
}

