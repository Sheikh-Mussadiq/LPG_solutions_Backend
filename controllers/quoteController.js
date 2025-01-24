const nodemailer = require('nodemailer');

exports.sendQuoteRequest = async (req, res) => {

    const { businessName, contactPerson, email, phone, businessType, requiredQuantity, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USERNAME, 
            pass: process.env.MAIL_PASSWORD 
        }
    }); 

    const htmlContent = `
      <h2>New Quote Request</h2>
      <table>
        <tr><td><strong>Business Name:</strong></td><td>${businessName}</td></tr>
        <tr><td><strong>Contact Person:</strong></td><td>${contactPerson}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
        <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
        <tr><td><strong>Business Type:</strong></td><td>${businessType}</td></tr>
        <tr><td><strong>Required Quantity:</strong></td><td>${requiredQuantity} kg/month</td></tr>
        <tr><td><strong>Message:</strong></td><td>${message || 'No additional requirements provided'}</td></tr>
      </table>
    `;

    try {
      await transporter.sendMail({
        from: "LPG Solutions <your-email@example.com>",
        to: 'mukarram.nawaz17@gmail.com',
        subject: 'New Quote Request From ' + businessName,
        html: htmlContent
      });

      res.status(200).json({ message: 'Quote request sent successfully!' });
    } catch (error) {
      console.error('Nodemailer Error:', error);
      res.status(500).json({ error: 'Failed to send the email.' });
    }
  } 
  

