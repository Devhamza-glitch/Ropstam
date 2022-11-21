import nodemailer from "nodemailer";

export const sendEmail = async (userEmail, randomPassword) => {
    const mailTransporter = nodemailer.createTransport({
        service: process.env.NODEMAILER_SERVICE,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASS
        }
    })
    const mailDetials = {
        from: process.env.NODEMAILER_EMAIL,
        to: userEmail,
        subject: 'Verification OTP',
        text: `Your Verification OTP is:  ${randomPassword}`
    }
    mailTransporter.sendMail(mailDetials, (error) => {
        if (error) {
            return false
        } else {
            return true
        }
    })
}