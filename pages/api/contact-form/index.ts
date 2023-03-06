import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, sujet, message } = req.body

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'ssl0.ovh.net',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASSWORD, // your password
    },
  })
  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }
  try {
    if (!validateEmail(email)) {
      throw new Error('email invalid')
    }
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`, // sender address
      to: 'contact@casian.fr', // list of receivers
      subject: sujet, // Subject line
      text: message, // plain text body
      html: `<b>${message}</b>`, // html body
    })

    // console.log('Message sent: %s', info.messageId)

    res.status(200).json({ message: 'Email envoyé avec succès !' })
  } catch (error) {
    if (error instanceof Error) {
      let message = "Erreur lors de l'envoi du e-mail"

      if (error.message === 'email invalid') {
        message = "Le format du e-mail n'est pas valide."
      }

      res.status(500).json({ message: message })
    }
  }
}
