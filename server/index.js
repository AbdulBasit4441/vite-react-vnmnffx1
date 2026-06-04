const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const fs = require('fs');
const path = require('path');
const DATA_DIR = path.join(__dirname, 'data');
const TESTIMONIALS_FILE = path.join(DATA_DIR, 'testimonials.json');

// ensure data dir exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
// ensure testimonials file exists
if (!fs.existsSync(TESTIMONIALS_FILE)) {
  fs.writeFileSync(TESTIMONIALS_FILE, JSON.stringify([]), 'utf8');
}

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  FROM_EMAIL,
  ADMIN_EMAIL,
} = process.env;

const cleanPassword = (pass) => (pass ? pass.replace(/\s+/g, '') : pass);

const transporter = nodemailer.createTransport({
  host: SMTP_HOST || 'smtp.gmail.com',
  port: Number(SMTP_PORT) || 587,
  secure: Number(SMTP_PORT) === 465,
  auth: {
    user: SMTP_USER,
    pass: cleanPassword(SMTP_PASS),
  },
});

app.post('/api/order-confirm', async (req, res) => {
  const { order, buyerEmail, buyerName } = req.body;

  if (!order || !buyerEmail || !buyerName) {
    return res.status(400).json({ error: 'Missing order, buyerEmail, or buyerName.' });
  }

  const items = (order.items || []).map((item) => {
    const variant = [item.color, item.size].filter(Boolean).join(' - ');
    return `<li>${item.name} x${item.qty}${variant ? ` (${variant})` : ''} - Rs. ${item.price}</li>`;
  });

  const orderSummary = `
    <p><strong>Order ID:</strong> ${order.id || 'N/A'}</p>
    <p><strong>Date:</strong> ${order.date}</p>
    <p><strong>Total:</strong> Rs. ${order.total}</p>
    <p><strong>Customer:</strong> ${buyerName}</p>
    <p><strong>Email:</strong> ${buyerEmail}</p>
    <p><strong>Phone:</strong> ${order.address?.phone || 'N/A'}</p>
    <p><strong>Address:</strong> ${order.address?.address}, ${order.address?.city}, ${order.address?.province} ${order.address?.zip}</p>
    <p><strong>Notes:</strong> ${order.address?.notes || 'None'}</p>
    <h3>Items</h3>
    <ul>${items.join('')}</ul>
  `;

  const adminMail = {
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New order confirmed from ${buyerName}`,
    html: `
      <h2>New Order Received</h2>
      ${orderSummary}
    `,
  };

  const customerMail = {
    from: FROM_EMAIL,
    to: buyerEmail,
    subject: 'Thank you for your order! 🎉',
    html: `
      <h2>Thank you for your order, ${buyerName}!</h2>
      <p>Your order is confirmed and we will process it shortly.</p>
      ${orderSummary}
      <p>If you have any questions, reply to this email.</p>
    `,
  };

  try {
    await transporter.sendMail(adminMail);
    await transporter.sendMail(customerMail);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send failed:', error);
    return res.status(500).json({ error: 'Unable to send emails.' });
  }
});

// Simple testimonials API (JSON file storage)
app.get('/api/testimonials', async (req, res) => {
  try {
    const raw = await fs.promises.readFile(TESTIMONIALS_FILE, 'utf8');
    const data = JSON.parse(raw || '[]');
    return res.json(data.reverse());
  } catch (err) {
    console.error('Failed to read testimonials', err);
    return res.status(500).json({ error: 'Unable to read testimonials' });
  }
});

app.post('/api/testimonials', async (req, res) => {
  try {
    const { name, city, rating, comment, emoji } = req.body;
    if (!name || !city || !comment) return res.status(400).json({ error: 'Missing fields' });

    const raw = await fs.promises.readFile(TESTIMONIALS_FILE, 'utf8');
    const list = JSON.parse(raw || '[]');
    const item = {
      id: Date.now(),
      name,
      city,
      rating: Number(rating) || 5,
      comment,
      emoji: emoji || '💬',
      created_at: new Date().toISOString(),
    };
    list.push(item);
    await fs.promises.writeFile(TESTIMONIALS_FILE, JSON.stringify(list, null, 2), 'utf8');
    return res.status(201).json(item);
  } catch (err) {
    console.error('Failed to write testimonial', err);
    return res.status(500).json({ error: 'Unable to save testimonial' });
  }
});

app.listen(PORT, () => {
  console.log(`Order email server listening on http://localhost:${PORT}`);
});
