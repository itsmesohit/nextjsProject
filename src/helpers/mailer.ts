

import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const sendEmail = async ({email,emailType, userId} :any) => {
    try{
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, 
            {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 10 * 60 * 1000});
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 10 * 60 * 1000});
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "38f04d758c6de2",
              pass: "682a6ec0d12607"
            }
        });
        const mailOptions = {
            from: "sohitku404@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",

            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify" : "reset"} your password
            or copy and paste the link below in your browser</p>
            <p> <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}

            </p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    }catch{

    }
}

