import { SendMailOptions, Transporter, createTransport } from 'nodemailer'

interface SendMailType {
  sendTo: string
  subject: string
  html: string
}

const sendMail = async ({ sendTo, subject, html }: SendMailType) => {
  const mailOptions: SendMailOptions = {
    from: 'contact.enzoalmeida@gmail.com',
    to: sendTo,
    subject,
    html,
    // attachments: [{ filename: "txt.txt", path: "./txt.txt" }],
  }

  const transporter: Transporter = createTransport({
    service: 'gmail',
    auth: {
      user: 'contact.enzoalmeida@gmail.com',
      pass: 'quhvhzcfdovmgied',
    },
  })

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email Send ' + info.response)
    }
  })
}

export { sendMail }
