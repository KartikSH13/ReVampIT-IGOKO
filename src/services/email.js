import nodemailer from 'nodemailer'

export default function email(email, name, subject,html,response) {
    console.log(email,name,subject);
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'yourmail@gmail.com', //Mail Id
            pass: '' //Password of your gmail for smtp
        }
    });
    const mailOptions = {
        from: '"Igoko Avionics" <yourmail@gmail.com>',
        to: email,
        subject: subject,
        html: html,
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
            return response.status(400).json({status:"false",message:err})
        }
        console.log("email Sent succesfully");
        return true;
    });
}