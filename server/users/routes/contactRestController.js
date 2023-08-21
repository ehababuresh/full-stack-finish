
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "YOUR_EMAIL@gmail.com", 
    pass: "YOUR_PASSWORD", 
  },
});

router.post("/", async (req, res) => {
  const formData = req.body;

  try {
    console.log(formData);
    // const mailOptions = {
    //   from: "YOUR_EMAIL@gmail.com", // כתובת האימייל שברצונך לשלוח ממנה
    //   to: "ehab.ab24@gmail.com", // כתובת האימייל שברצונך לשלוח אליה
    //   subject: "טופס יצירת קשר",
    //   text: `שם: ${formData.name}\nאימייל: ${formData.email}\nהודעה: ${formData.message}`,
    // };

    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.error("Error sending email:", error);
    //     return res.status(500).send("Failed to send email");
    //   }
    //   console.log("Email sent:", info.response);
    //   return res.status(200).send("Form data received and email sent successfully");
    // });
  } catch (error) {
    console.error("Error processing form data:", error);
    return res.status(500).send("Failed to process form data");
  }
});

module.exports = router;
