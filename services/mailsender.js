var nodeMailer = require('nodemailer');
var emailTemplate = require('email-templates').EmailTemplate;

var smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
var username = process.env.SMTP_USERNAME || "abc@gmail.com";
var password = process.env.SMTP_PASSWORD || "test.123";

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: smtpHost,
    auth: {
        user: username,
        pass: password
    }
});


sendMail = function(reciever, type){

}
