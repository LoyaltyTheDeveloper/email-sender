const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT 

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const upload = multer({ dest: 'uploads/' });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


app.post('/send-email', upload.single('csv'), async (req, res) => {
  const { subject, message, toEmail, mode } = req.body;

  if (mode === 'single') {

    try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject,
      html: message,
    });

    return res.status(200).json({ success: true, message: 'Email sent to recipient.' });
  } 
  catch (error) {
   
    return res.status(500).json({
      success: false,
      message: 'Failed to send email. Please check your internet connection.',
      error: error.message,
    });
  }
  }


  const results = [];
  const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (data) => {
      if (data.email) results.push(data.email);
    })
.on('end', async () => {
  try {
    for (const email of results) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject,
          html: message,
        });
      } catch (emailError) {
        console.error(`Failed to send to ${email}:`, emailError.message);

        return res.status(500).json({
          success: false,
          message: `Failed to send email. Please check your internet connection.`,
          error: emailError.message,
        });

      }
    }

    // Delete uploaded CSV file
    fs.unlinkSync(filePath);

    return res.status(200).json({
      success: true,
      message: `Emails sent to ${results.length} recipients.`,
    });

  } catch (error) {
    console.error('Bulk email error:', error);

    // Ensure file is removed even on failure
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to send bulk emails. Please try again later.',
      error: error.message,
    });
  }
});


});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
