import type { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"
import { fetchAPI } from "@/api/api"

export interface IEmailInfo {
  page: {
    contactForm: {
      burner: {
        senderEmail: string
        senderPassword: string
        re: string
      }
    }
  }
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const body = req.body as {
    [key: string]: string
  }
  const emailInfoRes = (await fetchAPI(`
  query MyQuery {
    page(id: "248", idType: DATABASE_ID) {
      contactForm {
        burner {
          senderEmail
          senderPassword
          re
        }
      }
    }
  }
  `)) as IEmailInfo
  const emailInfo = emailInfoRes.page.contactForm.burner
  const mailData = {
    to: emailInfo.re,
    subject: `Message from ${req.body.email}`,
    text: Object.entries(req.body)
      .map(([key, val]) => `${key.toUpperCase()}: ${val}\n`)
      .join(""),
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
  res.status(200).send({})
}
