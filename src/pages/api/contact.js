import emailjs from '@emailjs/nodejs';

export default async function handler(req, res) {
  // CORS headers
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
    // Parse JSON body
    const { firstName, lastName, email, message } = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // EmailJS configuration
    const templateParams = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      message: message,
    };

    // Send email
    const response = await emailjs.send(
      'service_azaq1hi',     // Service ID
      'template_elc7ftf',    // Template ID
      templateParams,
      {
        publicKey: 'C22PWP2rI3WBsfJAT',    // User ID / Public Key
        privateKey: 'tv-OcNHlbcpz5kOHeCeDM', // Add this to your .env file
      }
    );

    // Respond with success
    res.status(200).json({ 
      message: 'Email sent successfully', 
      responseDetails: response 
    });
  } catch (error) {
    console.error('Email sending error:', {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.message 
    });
  }
}