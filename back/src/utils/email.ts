import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const { email_service, user, pass } = process.env;

export const sendEmail = async(to : string, subject : string, text : string) : Promise<void> => {
    try{
        const transporter = nodemailer.createTransport({
            service : email_service,
            auth : {
                user : user,
                pass : pass,
            },
        });

        const mailOptions = {
            from : user,
            to,
            subject,
            text,
        };

        await transporter.sendMail(mailOptions);
    }catch(error){
        throw error;
    }
}