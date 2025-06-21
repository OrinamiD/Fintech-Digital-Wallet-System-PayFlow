const nodemailer = require("nodemailer");

const registrationEmail = async (email, token) => {
  const mailTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.EMAIL}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });

  const emailDetails = {
    from: `${process.env.EMAIL}`,
    to: `${email}`,
    subject: "Registration Successful",
    html: `
    <h2>Welcome to E-Commerce Superstore!</h2>
    <p>We're excited to have you join us. Please verify your email to complete your registration.</p>

    <p>
        <a href="https://www.yourcareerex.com/verify-email/${token}" style="background-color:#28a745;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">Verify Email</a>
    </p>

    <p>If the button doesn't work, please use the link below:</p>
    <p>
        <a href="https://www.yourcareerex.com/verify-email/${token}">https://www.yourcareerex.com/verify-email/${token}</a>
    </p>

    <hr>

    

    <p>Thank you,<br/>The E-Commerce Superstore Team</p>
`

    
  };

  await mailTranspot.sendMail(emailDetails);
};

const validEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

module.exports = {
  registrationEmail,
  validEmail,
};
