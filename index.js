const express = require('express');
const cors = require('cors');
const handler = require('./src/nodemailer');

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

  // Call the handler function with the event
  const response = await handler(event);

  // Send the response from the handler back to the client
  res.status(response.statusCode).json(JSON.parse(response.body));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
