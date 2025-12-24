const sgMail = require("@sendgrid/mail")
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (email) =>{
    await sgMail.send({
        to:email.to,
        from:"vinuthkumar@gmail.com",
        subject:email.subject,
        text:email.body
    });
};