import emailjs from 'emailjs-com';
import { init } from 'emailjs-com';

export default async function handler(req, res) {
  // Initialize EmailJS with user ID (critical step)
  init('C22PWP2rI3WBsfJAT');

  // CORS headers with more robust configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Explicitly check for POST method
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    // Parse JSON body (ensure body parsing middleware is set up)
    const { firstName, lastName, email, message } = req.body;

    console.log('Received request body:', req.body);

    // Validate input
    if (!firstName || !lastName || !email || !message) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Invalid email format' });
      return;
    }

    // Send email via EmailJS
    const response = await emailjs.send('service_azaq1hi', 'template_elc7ftf', {
      first_name: firstName,
      last_name: lastName,
      email: email,
      message: message,
    });

    // Respond with success
    res.status(200).json({ 
      message: 'Email sent successfully', 
      responseDetails: response 
    });
  } catch (error) {
    console.error('Comprehensive error details:', {
      errorMessage: error.message,
      errorStack: error.stack,
      errorName: error.name
    });

    res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.message,
      fullError: error
    });
  }
}