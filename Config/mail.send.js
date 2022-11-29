const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport( transporter, {
    service: 'gmail',
    auth: {
        user: 'neerajmangoit@gmail.com',
        pass: '8871641773@Nee'
    }
});

module.exports = transporter;