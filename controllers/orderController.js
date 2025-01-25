const Order = require('../models/order');
const nodemailer = require('nodemailer');

// Configure nodemailer
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.MAIL_USERNAME, 
//         pass: process.env.MAIL_PASSWORD 
//     }
// }); 

const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
    port: 465, // Secure port for GoDaddy SMTP
    secure: true, // Use SSLz
    auth: {
        user: process.env.MAIL_USERNAME, 
        pass: process.env.MAIL_PASSWORD 
    },  
});

exports.createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        
        const populatedOrder = await Order.findById(order._id).populate('products.product');
        
        const emailHTMLContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            overflow: hidden;
        }
        .header {
            background-color: #ff7700;
            color: #ffffff;
            text-align: center;
            padding: 20px 10px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            background-color:rgba(247, 240, 235, 0.76);
            padding: 20px;
        }
        .content h2 {
            color: #333333;
            font-size: 20px;
            margin-bottom: 10px;
        }
        .content p {
            color: #555555;
            line-height: 1.5;
            margin: 10px 0;
        }
        .table-container {
            margin: 20px 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table th, table td {
            text-align: left;
            align-items: center;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ddd;
        }
        table th {
            background-color: #ff7700;
            color: #ffffff;
        }
        table img {
            max-width: 50px;
            border-radius: 5px;
        }
        .total-price {
            margin: 20px 0;
            font-size: 20px;
            color: #333333;
        }
        .footer {
            background-color: #333333;
            color: #ffffff;
            text-align: center;
            padding: 10px 0;
            font-size: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Order Confirmation</h1>
        </div>
        <div class="content">
            <h2>Dear ${order.userName},</h2>
            <p>Thank you for your order! Here are your order details:</p>
            <p><strong>City:</strong> ${order.userCity}</p>
            <p><strong>Address:</strong> ${order.userAddress}</p>
            <p><strong>Order ID:</strong> ${order._id}</p>
            <div class="table-container">
                <p><strong>Products:</strong></p>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Weight</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${populatedOrder.products
                          .map(
                            (item, index) => `
                            <tr>
                                <td>${index + 1}</td>
                                <td>
                                    <img src="${item.product.image}" alt="${item.product.name}" />
                                    ${item.product.name}
                                </td>
                                <td>${item.product.weight} KG</td>
                                <td>${item.product.category === "refill" ? `${item.quantity} KG` : item.quantity}</td>
                            </tr>
                        `
                          )
                          .join('')}
                    </tbody>
                </table>
            </div>

            <div class="total-price">
                <p><strong>Total Price:</strong> ${order.total.toFixed(2)} PKR</p>
            </div>

            <p>We will process your order shortly.</p>
        </div>
        <div class="footer">
            <p>Best regards,</p>
            <p><strong>LPG Solutions</strong></p>
        </div>
    </div>
</body>
</html>
`;

await transporter.sendMail({
    from: "LPG Solutions <info@lpgsolutions.shop>",
    to: order.userEmail,
    subject: 'Order Confirmation - LPG Solutions',
    html: emailHTMLContent
});

await transporter.sendMail({
    from: "LPG Solutions <info@lpgsolutions.shop>",
    to: process.env.MAIL_USERNAME,
    subject: 'Order Confirmation - LPG Solutions',
    html: emailHTMLContent
});
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};