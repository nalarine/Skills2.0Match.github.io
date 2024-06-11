// Import necessary modules
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';

// Get the directory name of the current module file
const __dirname = dirname(fileURLToPath(import.meta.url));

// Create a transporter with Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'skills2match2024@gmail.com',
    pass: 'hcxy bjfv tmcv vcuo',
  },
});

// Function to send forgot password email
export const sendForgotPasswordEmail = async (user) => {
  const subject = "Reset Your Password";
  const resetPasswordLink = `https://skills2match.site/reset-password/${user.resetPasswordToken}`;
  const headerImagePath = path.join(__dirname, '..', 'company', 'src', 'assets', 'header-password.png');
  const logoPath = path.join(__dirname, '..', 'company', 'src', 'assets', 'logo.png');
  const message = `
    <html>
      <head>
        <style>
          body {
            font-family: 'Times New Roman', serif;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            text-align: left;
          }
          .header img {
            width: 100%;
            height: auto;
          }
          .content {
            background-color: #f7f7f7;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
          }
          .button {
            display: inline-block;
            background-color: transparent;
            color: #000000; /* Green text color for 'Verify Account' */
            text-decoration: none;
            padding: 10px 18px;
            border-radius: 30px;
            font-size: 16px;
            margin-top: 20px;
            transition: background-color 0.3s;
            border: 2px solid black; /* Black outline */
          }
          .button:hover {
            background: linear-gradient(90deg, rgba(214,176,180,1) 15%, rgba(179,176,248,1) 52%, rgba(240,224,236,1) 100%);
            color: #fff; /* Change text color to white on hover */
          }
          .footer {
            margin-top: 20px;
            text-align: left;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="cid:headerImage" alt="Header Image">
          </div>
          <div class="content">
            <p>Hello! <strong>${user.firstName}</strong>,</p>
            <p>We've received a request to reset your password.</p>
            <p>Please click the button below to reset your password. The link will expire after one hour.</p>
            <a href="${resetPasswordLink}" class="button">Reset Password</a>
            <p>If you didn't request for a password reset, don't worry, we haven't done anything yet; feel free to disregard this email.</p>
            <p>Thanks for using Skills2.0Match.</p>
          </div>
          <div class="footer">
            <p>Best,</p>
            <p>Skills2.0Match</p>
            <img src="cid:logo" alt="Skills 2.0 Match Logo" style="width: 100px; height: auto;">
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: 'Skills 2.0 Match <skills2match2024@gmail.com>',
      to: user.email,
      subject: subject,
      html: message,
      attachments: [
        {
          filename: 'header-password.jpg',
          path: headerImagePath,
          cid: 'headerImage'
        },
        {
          filename: 'logo.png',
          path: logoPath,
          cid: 'logo'
        }
      ]
    });

    console.log(`Forgot password email sent to ${user.email}`);
  } catch (error) {
    console.error("Error sending forgot password email:", error);
  }
};
