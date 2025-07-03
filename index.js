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
app.use(express.urlencoded({ extended: true }));
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

// function generateHtmlTemplate(subject) {
//   return `
//     <div style="font-family:Arial,sans-serif;padding:20px;">
//       <h2 style="color:#0d6efd;">${subject}</h2>
//       <p>Hi, welcome to Web3</p>
//       <footer style="margin-top:30px;font-size:12px;color:#777;">This is an automated message from your platform.</footer>
//     </div>
//   `;
// }


function generateHtmlTemplate(subject) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Unlock Solana's Fastest Trading Platform</title>
      <style>
        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; padding: 10px !important; }
          .header { padding: 20px 15px !important; }
          .content { padding: 20px 15px !important; }
          .feature-grid { display: block !important; }
          .feature-item { margin-bottom: 15px !important; }
          .cta-button { width: 100% !important; padding: 15px !important; }
          .steps { padding: 15px !important; }
        }
      </style>
    </head>
     <h2 style="color:#0d6efd;">${subject}</h2>
    <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      
      <!-- Main Container -->
      <div class="container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        
        <!-- Header -->
        <div class="header" style="background: linear-gradient(135deg, #9945FF 0%, #14F195 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
            ⚡ AXIOM TRADE
          </h1>
          <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
            Solana's Fastest Trading Platform
          </p>
        </div>

        <!-- Main Content -->
        <div class="content" style="padding: 30px 20px;">
          
          <!-- Greeting -->
          <h2 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 24px;">
            Hey Trader! 👋
          </h2>
          
          <p style="color: #333333; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
            Ready to dominate Solana's meme coin and perps game? <strong>Axiom Trade</strong>, backed by Y Combinator and launched in 2024, is the ultimate platform for traders like you. With sub-block trade execution and pro-level tools, we're helping degens snipe 10x pumps and earn passive income.
          </p>

          <!-- Why Axiom Trade Section -->
          <div style="background: linear-gradient(135deg, #f8f9ff 0%, #e8f4fd 100%); border-radius: 12px; padding: 25px; margin: 25px 0; border-left: 4px solid #9945FF;">
            <h3 style="color: #9945FF; margin: 0 0 20px 0; font-size: 20px; display: flex; align-items: center;">
              🚀 Why Axiom Trade?
            </h3>
            
            <div class="feature-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div class="feature-item" style="background: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <div style="color: #14F195; font-size: 20px; margin-bottom: 8px;">⚡</div>
                <strong style="color: #1a1a1a;">Lightning Speed</strong>
                <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Catch tokens before they hit Raydium with our migration sniper</p>
              </div>
              
              <div class="feature-item" style="background: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <div style="color: #14F195; font-size: 20px; margin-bottom: 8px;">💰</div>
                <strong style="color: #1a1a1a;">Low Fees</strong>
                <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Just 0.7% with code <code style="background: #f0f0f0; padding: 2px 4px; border-radius: 3px;">solnode</code> (10% discount)</p>
              </div>
              
              <div class="feature-item" style="background: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <div style="color: #14F195; font-size: 20px; margin-bottom: 8px;">🛠️</div>
                <strong style="color: #1a1a1a;">Elite Tools</strong>
                <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Pulse dashboard, whale wallet tracking, and Twitter alerts</p>
              </div>
              
              <div class="feature-item" style="background: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <div style="color: #14F195; font-size: 20px; margin-bottom: 8px;">🔒</div>
                <strong style="color: #1a1a1a;">Secure</strong>
                <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Non-custodial wallets with Turnkey's air-gapped tech</p>
              </div>
            </div>
          </div>

          <!-- Earn More Section -->
          <div style="background: linear-gradient(135deg, #fff8e1 0%, #f3e5f5 100%); border-radius: 12px; padding: 20px; margin: 25px 0; border: 2px solid #14F195;">
            <h4 style="color: #9945FF; margin: 0 0 15px 0; font-size: 18px;">💎 Earn More</h4>
            <ul style="color: #333; margin: 0; padding-left: 20px; line-height: 1.6;">
              <li>Get SOL cashback on trades (up to $1,000)</li>
              <li>30% referral fees</li>
              <li>Early users are stacking points for a potential airdrop</li>
            </ul>
          </div>

          <!-- Get Started Steps -->
          <div class="steps" style="background: #1a1a1a; color: #ffffff; border-radius: 12px; padding: 25px; margin: 25px 0;">
            <h3 style="color: #14F195; margin: 0 0 20px 0; font-size: 20px;">🎯 Get Started in 3 Steps:</h3>
            
            <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
              <div style="background: #9945FF; color: #ffffff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">1</div>
              <p style="margin: 0; line-height: 1.5;">Join now at <a href="https://axiom.sol-node.com/" style="color: #14F195; text-decoration: none;">axiom.sol-node.com</a> (exclusive invite link)</p>
            </div>
            
            <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
              <div style="background: #9945FF; color: #ffffff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">2</div>
              <p style="margin: 0; line-height: 1.5;">Connect Phantom or deposit SOL/USDC via Coinbase (no KYC)</p>
            </div>
            
            <div style="display: flex; align-items: flex-start;">
              <div style="background: #9945FF; color: #ffffff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">3</div>
              <p style="margin: 0; line-height: 1.5;">Set Pulse filters (50+ holders, 20k volume, 3-30 min age) to snipe winners</p>
            </div>
          </div>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://axiom.sol-node.com/" class="cta-button" style="display: inline-block; background: linear-gradient(135deg, #9945FF 0%, #14F195 100%); color: #ffffff; text-decoration: none; padding: 18px 40px; border-radius: 50px; font-weight: bold; font-size: 18px; box-shadow: 0 4px 15px rgba(153, 69, 255, 0.4); transition: transform 0.2s;">
              🚀 Start Trading Now
            </a>
          </div>

          <!-- Discount Code Highlight -->
          <div style="background: linear-gradient(135deg, #14F195 0%, #9945FF 100%); color: #ffffff; text-align: center; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 16px; font-weight: bold;">
              💸 Use code <span style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 4px; font-family: monospace;">SOLNODE</span> for 10% off fees!
            </p>
          </div>

          <!-- Closing -->
          <p style="color: #333333; line-height: 1.6; margin: 25px 0 0 0; font-size: 16px;">
            Don't miss out—Solana's hottest tokens are pumping, and Axiom's your edge.
          </p>
          
          <p style="color: #333333; margin: 20px 0 0 0; font-size: 16px;">
            Trade smarter,<br>
            <strong style="color: #9945FF;">The Axiom Trade Team</strong>
          </p>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
          <p style="color: #6c757d; margin: 0; font-size: 12px; line-height: 1.4;">
            This email was sent by Axiom Trade Team<br>
            <a href="mailto:support@axiom.sol-node.com" style="color: #9945FF; text-decoration: none;">support@axiom.sol-node.com</a>
          </p>
          <p style="color: #6c757d; margin: 10px 0 0 0; font-size: 11px;">
            © 2024 Axiom Trade. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

app.post('/send-email', upload.single('csv'), async (req, res) => {
  const { subject, message, toEmail, mode, template } = req.body;
   const html = template === 'html' ? generateHtmlTemplate(subject) : message;

  if (mode === 'single') {

    try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject,
      html,
      // html: message,
    });

    return res.status(200).json({ success: true, message: 'Email sent to recipient.' });
  } 
  catch (error) {
   
    return res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again.',
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
          message: `Failed to send email. Please try again.`,
          error: emailError.message,
        });

      }
    }

    // Delete uploaded CSV file
    fs.unlinkSync(filePath);

    return res.status(200).json({
      success: true,
      message: `Emails sent to ${results.length} recipient(s).`,
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
