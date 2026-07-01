// const express = require("express");
// const nodemailer = require("nodemailer");

// const router = express.Router();

// router.post("/contact", async (req, res) => {
//   const { name, email, phone, city, message, pincode , timeSlot } = req.body;

//   try {

//     const transporter = nodemailer.createTransport({
//             host: process.env.SMTP_HOST || "smtp.example.com", // ⚠️ Isko .env se sahi karein
//             port: process.env.SMTP_PORT || 587,
//             auth: {
//                 user: process.env.SMTP_MAIL,
//                 pass: process.env.SMTP_PASSWORD
//             }
//         });

//     // const transporter = nodemailer.createTransport({
//     //   service: "gmail",
//     //   auth: {
//     //     user: process.env.EMAIL_USER,
//     //     pass: process.env.EMAIL_PASS,
//     //   },
//     // });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: "fakeid1266@gmail.com",
//       subject: "New Contact Form Submission",
//       html: `
//         <h2>New Contact Request</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Address:</strong> ${city}</p>
//         <p><strong>Mobile:</strong> ${phone}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Message:</strong> ${message}</p>
//         <p><strong>Pincode:</strong> ${pincode}</p>
//         <p><strong>Time Slot:</strong> ${timeSlot}</p>
//       `,
//     });

//     res.json({
//       success: true,
//       message: "Email Sent Successfully",
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "Email Failed",
//     });
//   }
// });

// module.exports = router;

const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/contact", async (req, res) => {
  const { name, email, phone, city, message, pincode, timeSlot } = req.body;

  try {
    // Sirf Gmail service use karein, takki koi fake address call na ho
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Aapki .env file se uthayega
        pass: process.env.EMAIL_PASS, // Aapka 16-digit Google App Password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "fakeid1266@gmail.com",
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Address:</strong> ${city}</p>
        <p><strong>Mobile:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Pincode:</strong> ${pincode}</p>
        <p><strong>Time Slot:</strong> ${timeSlot}</p>
      `,
    });

    return res.json({
      success: true,
      message: "Email Sent Successfully",
    });

  } catch (err) {
    console.error("Mail Error:", err.message);
    // 500 error aane par bhi json response bhejein taaki frontend crash na ho
    return res.status(500).json({
      success: false,
      message: "Email Failed",
      error: err.message
    });
  }
});

module.exports = router;