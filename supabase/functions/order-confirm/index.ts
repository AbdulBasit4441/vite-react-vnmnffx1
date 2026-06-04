import { serve } from 'https://deno.land/std@0.203.0/http/server.ts';

const FROM_EMAIL = Deno.env.get('FROM_EMAIL');
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL');
const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY');

const buildOrderSummary = (order: any) => {
  const items = (order.items || []).map((item: any) => {
    const variant = [item.color, item.size].filter(Boolean).join(' - ');
    return `<li>${item.name} x${item.qty}${variant ? ` (${variant})` : ''} - Rs. ${item.price}</li>`;
  }).join('');

  return `
    <p><strong>Order ID:</strong> ${order.id || 'N/A'}</p>
    <p><strong>Date:</strong> ${order.date}</p>
    <p><strong>Total:</strong> Rs. ${order.total}</p>
    <p><strong>Customer:</strong> ${order.address?.name}</p>
    <p><strong>Email:</strong> ${order.address?.email}</p>
    <p><strong>Phone:</strong> ${order.address?.phone}</p>
    <p><strong>Address:</strong> ${order.address?.address}, ${order.address?.city}, ${order.address?.province} ${order.address?.zip}</p>
    <p><strong>Notes:</strong> ${order.address?.notes || 'None'}</p>
    <h3>Items</h3>
    <ul>${items}</ul>
  `;
};

const sendEmail = async (to: string, subject: string, html: string) => {
  if (!SENDGRID_API_KEY || !FROM_EMAIL) {
    throw new Error('Missing SENDGRID_API_KEY or FROM_EMAIL environment variable');
  }

  const payload = {
    personalizations: [
      {
        to: [{ email: to }],
        subject,
      },
    ],
    from: { email: FROM_EMAIL },
    content: [
      {
        type: 'text/html',
        value: html,
      },
    ],
  };

  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`SendGrid error: ${res.status} ${body}`);
  }
};

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  if (!ADMIN_EMAIL) {
    return new Response(JSON.stringify({ error: 'ADMIN_EMAIL is not set' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const { order, buyerEmail, buyerName } = body;

    if (!order || !buyerEmail || !buyerName) {
      return new Response(JSON.stringify({ error: 'Missing order, buyerEmail, or buyerName.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const orderSummary = buildOrderSummary(order);

    await Promise.all([
      sendEmail(
        ADMIN_EMAIL,
        `New order confirmed from ${buyerName}`,
        `<h2>New Order Received</h2>${orderSummary}`
      ),
      sendEmail(
        buyerEmail,
        'Thank you for your order! 🎉',
        `<h2>Thank you for your order, ${buyerName}!</h2><p>Your order is confirmed and we will process it shortly.</p>${orderSummary}<p>If you have any questions, reply to this email.</p>`
      ),
    ]);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Email function error', error);
    return new Response(JSON.stringify({ error: error.message || 'Email send failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
