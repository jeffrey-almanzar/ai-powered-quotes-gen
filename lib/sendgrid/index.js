const sgMail = require('@sendgrid/mail')

function sendEmail(options) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const {
        toEmail,
        subject,
        content,
    } = options;

    const msg = {
        to: toEmail, // Change to your recipient
        from: 'almanzarortizjeffrey@gmail.com', // almanzarortizjeffrey@gmail.com
        subject: subject,
        text: content,
        // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}

module.exports = sendEmail;