const express = require('express');
const cors = require('cors');
const handler = require('./src/nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Define route to use the handler
app.post('/send-email', async (req, res) => {
  const event = {
    httpMethod: req.method,
    body: JSON.stringify(req.body),

  };
  console.log(req.body);

  // Call the handler function with the event
  const response = await handler(event);
  console.log(response);

  // Send the response from the handler back to the client
  res.status(response.statusCode).json(JSON.parse(response.body));
});


app.get("/send-email", (req, res) => {
  res.json({ message: "Hello from Ayush Chauhan" });
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
