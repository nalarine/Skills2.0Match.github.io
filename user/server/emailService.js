import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Create a transporter with Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'skills2match2024@gmail.com',
    pass: 'hcxy bjfv tmcv vcuo',
  },
});

export const sendVerificationEmail = async (user) => {
  const subject = "Verify your email address";
  const headerImagePath = path.join(__dirname, '..', 'company', 'src', 'assets', 'header-image.png');
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
      text-align: center;
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
      color: #38a169; /* Green text color for 'Verify Account' */
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 30px;
      font-size: 16px;
      margin-top: 20px;
      transition: background-color 0.3s;
      border: 2px solid black; /* Black outline */
    }
    .button:hover {
      background-color: #38a169;
      color: #fff; /* Change text color to white on hover */
    }
    .footer {
      margin-top: 20px;
      text-align: center;
    }
  </style>

    </head>
    <body>
    <div class="container">
    <div class="header">
      <img src="cid:headerImage" alt="Header Image">
    </div>
    <div class="content">
      <p>Hello <strong>${user.firstName}</strong>,</p>
      <p>Thank you for registering with Skills 2.0 Match.</p>
      <p>Please click the button below to verify your account. The link will expire after one hour.</p>
      <a href="https://skills2match.netlify.app/verification-success/${user.verificationToken}" class="button">Verify Account</a>
      <p>If you did not register for an account, you can ignore this email.</p>
    </div>
    <div class="footer">
      <p>Regards,</p>
      <p>Skills 2.0 Match</p>
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
          filename: 'header-image.jpg',
          path: headerImagePath,
          cid: 'headerImage' // Unique identifier for the header image
        },
        {
          filename: 'logo.png',
          path: logoPath,
          cid: 'logo' // Unique identifier for the logo
        }
      ]
    });

    console.log(`Verification email sent to ${user.email}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};
