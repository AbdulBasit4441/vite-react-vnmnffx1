# vite-react

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/vite-react)

## Local Email Server Setup

This app now includes a local backend endpoint for sending order confirmation emails.

1. Create a `.env` file at the project root with:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-gmail-app-password
   FROM_EMAIL=your-email@gmail.com
   ADMIN_EMAIL=andazeyebayan@gmail.com
   ```
2. Run the email server in one terminal:
   ```bash
   npm run server
   ```
3. Run the Vite app in another terminal:
   ```bash
   npm run dev
   ```

The checkout page will call `POST /api/order-confirm` and send:
- an email to `ADMIN_EMAIL`
- a thank-you email to the customer
