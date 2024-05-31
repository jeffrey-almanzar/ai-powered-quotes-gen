const sgMail = require('@sendgrid/mail')

function sendEmail(options) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const {
        toEmail,
        subject,
        content,
    } = options;

    const msg = {
        to: toEmail, 
        from: 'almanzarortizjeffrey@gmail.com',
        subject: subject,
        text: content,
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