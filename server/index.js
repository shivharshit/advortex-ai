import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import db from './db.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

// Format CSV string safely
const escapeCSV = (str) => {
  if (str === null || str === undefined) return '';
  const text = String(str);
  if (text.includes(',') || text.includes('"') || text.includes('\\n')) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
};

// --- Endpoints ---

// POST /api/leads - Create a new lead
app.post('/api/leads', async (req, res) => {
  const { fullName, email, phone, company, service, budget, message } = req.body;
  const date = new Date().toISOString();

  if (!fullName || !email) {
    return res.status(400).json({ error: 'Full Name and Email are required' });
  }

  const sql = `INSERT INTO leads (fullName, email, phone, company, service, budget, message, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [fullName, email, phone, company, service, budget, message, date];

  db.run(sql, params, async function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to save lead' });
    }

    const leadId = this.lastID;
    
    try {
      // 1. WhatsApp Notification via Twilio
      if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.WHATSAPP_NUMBER) {
        const twilioSid = process.env.TWILIO_ACCOUNT_SID;
        const twilioToken = process.env.TWILIO_AUTH_TOKEN;
        const toWhatsApp = `whatsapp:${process.env.WHATSAPP_NUMBER}`;
        const fromWhatsApp = 'whatsapp:+14155238886'; // Official Twilio Sandbox Number
        
        const waText = `🚨 *NEW LEAD: AdVortex AI*\n\n*Name:* ${fullName}\n*Service:* ${service || 'N/A'}\n*Email:* ${email}\n*Phone:* ${phone || 'N/A'}\n*Budget:* ${budget || 'N/A'}\n\n*Message:* ${message || 'N/A'}`;
        
        try {
          // Send request directly to Twilio REST API
          fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + Buffer.from(`${twilioSid}:${twilioToken}`).toString('base64')
            },
            body: new URLSearchParams({
              To: toWhatsApp,
              From: fromWhatsApp,
              Body: waText
            })
          })
          .then(res => res.json())
          .then(data => {
            if (data.sid) console.log('WhatsApp notification sent successfully via Twilio!');
            else console.error('Failed to send WhatsApp message via Twilio:', data);
          })
          .catch(err => console.error('Error sending WhatsApp message via Twilio:', err));
        } catch (waErr) {
          console.error("Twilio API Error:", waErr);
        }
      } else {
        console.log(`[WHATSAPP MOCK] Notification sent to +919183347948: New Lead - ${fullName} (${email}) for ${service}`);
      }

      // 2. Send email to support/business
      if (process.env.RESEND_API_KEY) {
        const businessEmail = process.env.BUSINESS_EMAIL || 'support@advortex.in';
        
        const { data: data1, error: error1 } = await resend.emails.send({
          from: 'AdVortex AI <support@advortex.in>',
          to: [businessEmail],
          subject: `New Lead: ${fullName} - ${service}`,
          html: `
            <h2>New Lead Received</h2>
            <ul>
              <li><strong>Name:</strong> ${fullName}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Phone:</strong> ${phone || 'N/A'}</li>
              <li><strong>Company:</strong> ${company || 'N/A'}</li>
              <li><strong>Service:</strong> ${service || 'N/A'}</li>
              <li><strong>Budget:</strong> ${budget || 'N/A'}</li>
              <li><strong>Message:</strong> ${message || 'N/A'}</li>
              <li><strong>Date:</strong> ${date}</li>
            </ul>
          `
        });

        if (error1) {
          console.error('Failed to send business email:', error1.message || error1);
        } else {
          console.log(`Business notification sent to ${businessEmail}`, data1);
        }

        // 3. Send confirmation email to user
        const { data: data2, error: error2 } = await resend.emails.send({
          from: 'AdVortex AI <support@advortex.in>',
          to: [email],
          subject: 'Thank you for contacting AdVortex AI',
          html: `
            <h3>Hi ${fullName},</h3>
            <p>Thank you for reaching out to AdVortex AI.</p>
            <p>We have successfully received your inquiry regarding <strong>${service || 'our services'}</strong> and will get back to you shortly.</p>
            <br/>
            <p>Best regards,<br/>The AdVortex AI Team</p>
          `
        });

        if (error2) {
          console.error('Failed to send user confirmation email:', error2.message || error2);
        } else {
          console.log(`User confirmation sent to ${email}`, data2);
        }
      } else {
        console.log('[RESEND MOCK] Emails would be sent here, but RESEND_API_KEY is missing.');
      }

      res.status(201).json({ success: true, leadId, message: 'Lead successfully captured' });
    } catch (apiError) {
      console.error('Error triggering notifications:', apiError);
      // Still return success since lead was saved
      res.status(201).json({ success: true, leadId, message: 'Lead saved but notifications failed' });
    }
  });
});

// GET /api/leads - Fetch all leads as JSON
app.get('/api/leads', (req, res) => {
  // Simple auth check from header
  const authHeader = req.headers.authorization;
  if (authHeader !== 'Bearer advortex-admin') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  db.all(`SELECT * FROM leads ORDER BY date DESC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// GET /api/leads/export - Export leads as CSV
app.get('/api/leads/export', (req, res) => {
  db.all(`SELECT * FROM leads ORDER BY date DESC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    let csvStr = 'ID,Full Name,Email,Phone,Company,Service,Budget,Message,Date\\n';
    rows.forEach(row => {
      csvStr += [
        row.id,
        escapeCSV(row.fullName),
        escapeCSV(row.email),
        escapeCSV(row.phone),
        escapeCSV(row.company),
        escapeCSV(row.service),
        escapeCSV(row.budget),
        escapeCSV(row.message),
        escapeCSV(row.date)
      ].join(',') + '\\n';
    });
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="advortex_leads.csv"');
    res.send(csvStr);
  });
});

// POST /api/careers - Submit a career application
app.post('/api/careers', async (req, res) => {
  const { fullName, email, resumeUrl, skills, role, resumeFile } = req.body;
  const date = new Date().toISOString();

  if (!fullName || !email || !role) {
    return res.status(400).json({ error: 'Name, Email, and Role are required' });
  }

  // If a file was uploaded, we save its filename in the DB to indicate an attachment was sent
  const dbResumeLink = resumeFile ? `Attached File: ${resumeFile.filename}` : (resumeUrl || 'N/A');

  const sql = `INSERT INTO applications (fullName, email, resumeUrl, skills, role, date) VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [fullName, email, dbResumeLink, skills, role, date];

  db.run(sql, params, async function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to save application' });
    }

    const applicationId = this.lastID;
    
    try {
      if (process.env.RESEND_API_KEY) {
        const businessEmail = process.env.BUSINESS_EMAIL || 'support@advortex.in';
        
        let attachments = [];
        if (resumeFile && resumeFile.content && resumeFile.filename) {
          // Extract the base64 data (remove the data:application/pdf;base64, part if present)
          const base64Data = resumeFile.content.includes(',') 
            ? resumeFile.content.split(',')[1] 
            : resumeFile.content;
            
          attachments.push({
            filename: resumeFile.filename,
            content: base64Data
          });
        }
        
        // 1. Notify business email
        await resend.emails.send({
          from: 'AdVortex AI <support@advortex.in>',
          to: [businessEmail],
          subject: `New Job Application: ${fullName} - ${role}`,
          attachments: attachments,
          html: `
            <h2>New Career Application Received</h2>
            <ul>
              <li><strong>Name:</strong> ${fullName}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Role Applied:</strong> ${role}</li>
              <li><strong>Skills:</strong> ${skills || 'N/A'}</li>
              <li><strong>Resume/Portfolio:</strong> ${dbResumeLink}</li>
              <li><strong>Date:</strong> ${date}</li>
            </ul>
          `
        });

        // 2. Auto-reply to applicant
        await resend.emails.send({
          from: 'AdVortex AI <support@advortex.in>',
          to: [email],
          subject: 'Application Received - AdVortex AI',
          html: `
            <h3>Hi ${fullName},</h3>
            <p>Thank you for applying for the <strong>${role}</strong> position at AdVortex AI.</p>
            <p>We have successfully received your application. Our team will review your details and get back to you if your profile matches our current needs.</p>
            <br/>
            <p>Best regards,<br/>The AdVortex AI Team</p>
          `
        });
      } else {
        console.log('[RESEND MOCK] Career Application emails would be sent here, but RESEND_API_KEY is missing.');
      }
      res.status(201).json({ success: true, applicationId, message: 'Application submitted successfully' });
    } catch (apiError) {
      console.error('Error sending application emails:', apiError);
      res.status(201).json({ success: true, applicationId, message: 'Application saved but email notification failed' });
    }
  });
});

// GET /api/careers - Fetch all applications as JSON
app.get('/api/careers', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader !== 'Bearer advortex-admin') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  db.all(`SELECT * FROM applications ORDER BY date DESC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
