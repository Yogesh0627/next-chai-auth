import { mailOptions } from './../lib/config';


import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'



export const sendEmail = async({email,emailType,userId}:{email:any,emailType:any,userId:any})=>{
  let mailOptions1 = mailOptions
try {
  
    const hashedToken = await bcryptjs.hash(userId.toString(),10)
    if (emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId,{$set:{verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000}})
    }else if(emailType==="RESET"){
        await User.findByIdAndUpdate(userId,{$set:{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+3600000}})
    }
    const transporter = nodemailer.createTransport(mailOptions1);

      const verifyEmailHtml = `<p>Click<a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">here</a>to "Verify your email"
      or copy and paste the link below in your browser <br/>
      ${process.env.DOMAIN}/verifyEmail?token=${hashedToken}
      </p>`// html body
      const forgotPasswordHtml = `<p>Click<a href="${process.env.DOMAIN}/forgotPassword?token=${hashedToken}">here</a>to "Reset your password"
      or copy and paste the link below in your browser <br/>
      ${process.env.DOMAIN}/forgotPassword?token=${hashedToken}
      </p>`// html body
      const mailOptions ={
          from: "chauhanyogesh950@gmail.com", // sender address
          to: email, // list of receivers
          subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
        //   text: "Hello world?", // plain text body
          html: `${emailType === "VERIFY" ? `${verifyEmailHtml}`:`${forgotPasswordHtml}`}`
        }

        const mailResponse = transporter.sendMail(mailOptions)
        return mailResponse

} catch (error:any) {
    throw new Error(error.message)
    console.log(error.message, `Error from mailer from sendEmail`)
}
}


/*

html: `<p>Click<a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">here</a>to ${emailType === "VERIFY" ?"Verify your email":"Reset your password"}
           or copy and paste the link below in your browser <br/>
           ${process.env.DOMAIN}/verifyEmail?token=${hashedToken}
           </p>`, // html body
*/