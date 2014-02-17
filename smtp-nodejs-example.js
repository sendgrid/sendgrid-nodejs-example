var dotenv = require('dotenv');
dotenv.load();

var nodemailer = require('nodemailer');
var smtpapi    = require('smtpapi');

var sendgrid_username   = process.env.SENDGRID_USERNAME;
var sendgrid_password   = process.env.SENDGRID_PASSWORD;
var to                  = process.env.TO;

// Build the smtpapi header
var header = new smtpapi.Header();
header.addSubstitution('%how%', ['Owl']);

// Add the smtpapi header to the general headers
var headers    = { 'x-smtpapi': header.jsonString() };

// Use nodemailer to send the email
var settings  = {
  host: "smtp.sendgrid.net",
  port: parseInt(587, 10),
  requiresAuth: true,
  auth: {
    user: sendgrid_username,
    pass: sendgrid_password 
  }
};
var smtpTransport = nodemailer.createTransport("SMTP", settings);

var mailOptions = {
  from:     to,
  to:       to,
  subject:  "[smtp-nodejs-example] Owl",
  text:     "%how% are you doing?",
  html:     "%how% are you doing?",
  headers:  headers
}

smtpTransport.sendMail(mailOptions, function(error, response) {
  smtpTransport.close();

  if (error) { 
    console.log(error);
  } else {
    console.log("Message sent: " + response.message);
  }
});
