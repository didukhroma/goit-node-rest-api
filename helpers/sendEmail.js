import nodemailer from 'nodemailer';
import HttpCode from './HttpCode.js';
import HttpError from './HttpError.js';

const { EMAIL_USER, EMAIL_PASSWORD, PORT } = process.env;

const config = {
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async (email, token) => {
  const emailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: 'Verify email',
    text: 'Hello. Please click link bellow for verify your email',
    html: `<a href="http://localhost:${
      PORT || 3000
    }/api/auth/verify/${token}" target="_blank" rel="noopener noreferrer">Click for verify email</>`,
  };

  try {
    await transporter.sendMail(emailOptions);
  } catch (error) {
    throw HttpError(HttpCode[500].code, 'Error in email service');
  }
};

export default sendEmail;
