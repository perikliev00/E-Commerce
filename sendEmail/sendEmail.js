const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendOrderConfirmationEmail = (to, orderDetails) => {
  const customerMsg = {
    to: to,
    from: 'aperikliev@gmail.com', 
    subject: 'Order Confirmation',
    text: `Thank you for your order!`,
    html: `<strong>Thank you for your order! We will connect with you for confirmation as soon as possible.</strong><br>`,
  };

  const adminMsg = {
    to: 'perikliev00@gmail.com',
    from: 'aperikliev@gmail.com',
    subject: 'New Order Received',
    text: `A new order has been placed by ${to}.`,
    html: `<strong>A new order has been placed by ${to}.</strong><br>Order Details: ${JSON.stringify(orderDetails)}`,
  };

  sgMail
    .send(customerMsg)
    .then(() => {
      console.log('Order confirmation email sent to customer');
    })
    .catch((error) => {
      console.error('Error sending email to customer:', error);
    });

  sgMail
    .send(adminMsg)
    .then(() => {
      console.log('Order notification email sent to admin');
    })
    .catch((error) => {
      console.error('Error sending email to admin:', error);
    });
};

module.exports = sendOrderConfirmationEmail;