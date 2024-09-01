const nodemailer = require("nodemailer");

async function handler(event) {
  const username = process.env.NODEMAILER_MAIL;
  const password = process.env.NODEMAILER_PASS;



  // Assuming the event body is JSON stringified with the form data
  const { name, email, message } = JSON.parse(event.body);

  // Prepare CORS response headers
  const corsHeaders = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
  };

  if (event.httpMethod === 'OPTIONS') {
    // Return CORS preflight response
    return {
      statusCode: 204,
      headers: corsHeaders,
    };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
      user: username,
      pass: password,
    },
  });

  try {
    await transporter.sendMail({
      from: username, // It should be your username to avoid issues with Gmail's 'from' address policy
      to: 'ai.aayush10@gmail.com',
      replyTo: email,
      subject: `Congratulations, A New Project from ${name}`,
      html: `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
      `,
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Success: email was sent' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'COULD NOT SEND MESSAGE' }),
    };
  }
}


module.exports = handler;