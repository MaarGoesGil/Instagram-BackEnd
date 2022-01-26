const nodemailer = require('nodemailer')
require('dotenv').config()

const sendEmailReset = async (email, password) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Reser Password - InstagramCopy',
    html: `
    <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
    <tr height="200px"> 
        <td bgcolor="" width="600px">
            <h1 style="color: #fff; text-align:center">Reset Password</h1>
            <p  style="color: #fff; text-align:center">Your new password is:
                <span style="color: #e84393">${password}</span>, please change it after login. <br />
            If you didn't request this change, please contact us. 
            </p>
        </td>
    </tr>
    <tr bgcolor="#e84393">
        <td style="text-align:center">
            <p style="color: #fff">Attentment: <b>The Backend Team</b></p>
        </td>
    </tr>
</table>`
  }
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

const senEmailSignup = async (email) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  })
  const link = 'http://localhost:3001/users/confirm?email=' + email
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Confirm acount email- InstagramCopy',
    html: `
    <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
    <tr height="200px"> 
        <td bgcolor="" width="600px">
            <h1 style="color: #fff; text-align:center">Confirm acount</h1>
            <p  style="color: #fff; text-align:center">Please click this
            <a href=${link}> <span style="color: #e84393">link</span> </a> below to confirm your email. <br />
            If you didn't request this acount, please contact us. 
            </p>
        </td>
    </tr>
    <tr bgcolor="#e84393">
        <td style="text-align:center">
            <p style="color: #fff">Attentment: <b>The Backend Team</b></p>
        </td>
    </tr>
</table>`
  }
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

module.exports = {
  sendEmailReset,
  senEmailSignup
}
