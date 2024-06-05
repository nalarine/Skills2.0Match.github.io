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

export const sendAccountDeletionEmail = async (user) => {
  const subject = 'Account Deletion Confirmation';
  const headerImagePath = path.join(__dirname, '..', 'company', 'src', 'assets', 'header-deletion.png');
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
          <p>Dear <strong>${user.firstName}</strong>,</p>
          <p>Your account is scheduled for deletion. If this is a mistake, please contact us immediately.</p>
        </div>
        <div class="footer">
          <p>Best regards,</p>
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
          filename: 'header-deletion.jpg',
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

    console.log(`Account deletion email sent to ${user.email}`);
  } catch (error) {
    console.error("Error sending account deletion email:", error);
  }
};
